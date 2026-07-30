import OrderSucess from "../models/ordersucessModel.js";
import { autogenrateOrderId } from "../utils/genrateOrderId.js";




export const getOrderByOrderId = async (req, res) => {
  try {

    const { orderId } = req.params;

    const order = await OrderSucess.findOne({ orderId });


    if (!order) {

      return res.status(404).json({

        success: false,

        message: "Order not found",

      });

    }


    return res.status(200).json({

      success: true,

      message: "Order Found Successfully",

      order,

    });


  } catch (error) {

    console.error("Search Order Error:", error);

    return res.status(500).json({

      success: false,

      message: error.message || "Internal Server Error",

    });

  }
};


export const paymentSuccess = async (req, res) => {
  try {

    console.log("FULL BODY ===>", JSON.stringify(req.body, null, 2));


    const {
      user,
      products,
      shippingAddress,
      totalAmount,
      paymentId,
    } = req.body || {};

    // Validation
    // if (
    //   !user ||
    //   !products ||
    //   products.length === 0 ||
    //   !shippingAddress ||
    //   !totalAmount ||
    //   !paymentId
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "All fields are required",
    //   });
    // }


    // Create Order
    const order = await OrderSucess.create({

      orderId: autogenrateOrderId(),

      user:user,

      products,

      shippingAddress,

      totalAmount,

      paymentId,

      paymentStatus: "Paid",

      orderStatus: "Placed",

    });


    return res.status(201).json({

      success: true,

      message: "Payment Successful. Order Created Successfully.",

      order,

    });


  } catch (error) {

    console.error("Payment Success Error:", error);

    return res.status(500).json({

      success: false,

      message: error.message || "Internal Server Error",

    });

  }
};


// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {

    const orders = await OrderSucess.find()
      .sort({ createdAt: -1 });


    if (!orders || orders.length === 0) {

      return res.status(404).json({

        success: false,

        message: "No orders found",

      });

    }


    return res.status(200).json({

      success: true,

      count: orders.length,

      message: "All Orders Fetch Successfully",

      orders,

    });


  } catch (error) {

    console.error("Get All Orders Error:", error);


    return res.status(500).json({

      success: false,

      message: error.message || "Internal Server Error",

    });

  }
};


// fetch order by orderid
export const getOrderBOrderId = async(req , res) =>{
  try {
    const {orderId} = req.params;
    const order = await OrderSucess.findOne({orderId});
    if(!order){
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    res.status(200).json({
      success:true,
      order,

    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    });
    
  }
};

// update order status

export const updateOrderStatus = async (req,res)=>{
  try {
    const {orderId} = req.params;
    const {orderStatus} = req.body;

    const order = await OrderSucess.findOneAndUpdate(
      {orderId},{orderStatus},{new:true}
    );
    if(!order){
      return
      res.status(404).json({
        success:false,
        message:"Order not found",
      });
    }
    res.status(200).json({
      success:true,
      message:"Order status updated",
      order
    })
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message,
    });
    
  }
};