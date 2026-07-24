import Cart from "../models/cartModel.js";


export const getCartCount = async (req, res) => {
  try {
    const count = await Cart.countDocuments({
      userId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteCartItemsLegth = async (req, res) => {

  try {
      const userId = req.user.id;
  const cartId = req.params.cartId;

  const cartItem = await Cart.findOneAndDelete({
    _id: cartId,
    user:userId,

  });
  if(!cartItem){
    return res.status(404).json({
      success: false,
      message: "Cart item not found",
    });
  }

  const cartCount = await Cart.countDocuments({
    user:userId
  });
  return res.status(200).json({
    success:true,
    message: "Cart item deleted sucessfully",
    cartCount,
  });

    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message,
    });
    
  }

};

