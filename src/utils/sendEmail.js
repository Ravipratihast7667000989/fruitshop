import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS, // Gmail App Password
  },
});

transporter.verify((error) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Connected Successfully");
  }
});

const sendEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Fruit App 🍎" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "Fruit App - OTP Verification",
      html: `
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color:green">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("Email Sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export default sendEmail;