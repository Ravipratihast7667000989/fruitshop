import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            unique: true,
            required: true,
        },

        user:{
 type: mongoose.Schema.Types.ObjectId,
 ref:"User",
 required:true
},
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: String,
                image: String,
                price: Number,
                quantity: Number,
            },
        ],

        shippingAddress: {
            fullName: String,
            mobile: String,
            address: String,
            city: String,
            state: String,
            pincode: String,
        },

        totalAmount: {
            type: Number,
            required: true
        },

        paymentId: {
            type: String,
            default: "",
        },

        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },

        orderStatus: {
            type: String,
            enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Placed",
        },
    },
    { timestamps: true }
);

export default mongoose.model("OrderSucess", orderSchema);