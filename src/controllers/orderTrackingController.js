import orderModel from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {

    const order = await orderModel.create({

      user: req.user.id,

      orderId: "#ORD" + Date.now(),

      items: req.body.items,

      totalAmount: req.body.totalAmount,

      paymentStatus: "Paid",

      orderStatus: "Pending",

      address: req.body.address,

      tracking: [
        {
          status: "Pending",
          message: "Your order has been placed."
        }
      ]
    });

    res.status(201).json({
      success: true,
      order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getTracking = async (req, res) => {

  try {

    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .select("orderId orderStatus tracking");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      tracking: order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


export const updateTracking = async (req, res) => {

  try {

    const { orderId } = req.params;

    const { status, message } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = status;

    order.tracking.push({
      status,
      message
    });

    await order.save();

    res.json({
      success: true,
      message: "Tracking Updated",
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};