import Cart from "../models/cartModel.js";


// Add Cart

export const addCart = async (req, res) => {
  try {

    const {
      productId,
      productName,
      image,
      price,
      quantity
    } = req.body;

    if (
      !productId ||
      !productName ||
      !price
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    let cart = await Cart.findOne({
      userId: req.user.id,
      productId
    });

    if (cart) {

      cart.quantity += Number(quantity);

      await cart.save();

      return res.status(200).json({
        success: true,
        message: "Quantity Updated",
        cart
      });

    }

    cart = await Cart.create({

      userId: req.user.id,

      productId,

      productName,

      image,

      price,

      quantity

    });

    res.status(201).json({

      success: true,

      message: "Product Added Successfully",

      cart

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }
};




// Get Cart

export const getCart = async (req, res) => {

  try {

    const cart = await Cart.find({

      userId: req.user.id

    });

    res.status(200).json({

      success: true,

      cart

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};


// delete cart length

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



/// cart count

export const getCartCount = async (req, res) => {
  try {
    const count = await Cart.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete Cart

export const deleteCart = async (req, res) => {

  try {

     const { productId } = req.params;

    const item = await Cart.findOneAndDelete({
      userId: req.user.id,
      productId,
    });

    res.json({

      success: true,

      message: "Deleted Successfully"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




// Update Quantity

export const updateCart = async (req, res) => {

  try {

    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(

      req.params.id,

      {

        quantity

      },

      {

        new: true

      }

    );

    res.json({

      success: true,

      cart

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




// Count

export const cartCount = async (req, res) => {

  try {

    const count = await Cart.countDocuments({

      userId: req.user.id

    });

    res.json({

      success: true,

      count

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};




// Clear Cart

export const clearCart = async (req, res) => {

  try {

    await Cart.deleteMany({

      userId: req.user.id

    });

    res.json({

      success: true,

      message: "Cart Cleared"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};