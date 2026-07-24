import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (e) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};