import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Processing",
      "Packed",
      "Shipped",
      "Out For Delivery",
      "Delivered",
      "Cancelled"
    ]
  },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    items: [],

    totalAmount: Number,

    paymentStatus: {
      type: String,
      default: "Pending"
    },

    orderStatus: {
      type: String,
      default: "Pending"
    },

    address: Object,

    tracking: [trackingSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);