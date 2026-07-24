import productModel from "../models/productModel.js";
import Order from "../models/orderModel.js";



export const createOrder = async (req, res) => {

    try {


        const {
            items,
            totalAmount,
            paymentStatus,
            address
        } = req.body;



        const order = await Order.create({



            orderId: "ORD" + Date.now(),


            items,


            totalAmount,


            paymentStatus,


            address,


            tracking: [

                {
                    status: "Order Placed",
                    date: new Date().toLocaleDateString(),
                    completed: true
                },

                {
                    status: "Processing",
                    date: "",
                    completed: false
                },

                {
                    status: "Shipped",
                    date: "",
                    completed: false
                },

                {
                    status: "Delivered",
                    date: "",
                    completed: false
                }

            ]


        });



        res.status(201).json({

            success: true,

            order

        });


    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }


};
// GET Tracking
export const getTracking = async (req, res) => {
    try {
        const order = await productModel.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            tracking: order.tracking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// UPDATE ORDER TRACKING STATUS

export const updateTracking = async (req, res) => {

    try {

        const { orderId, trackingId } = req.params;

        const { status, date, completed } = req.body;


        const order = await Order.findById(orderId);


        if (!order) {

            return res.status(404).json({

                success: false,
                message: "Order not found"

            });

        }



        const tracking = order.tracking.id(trackingId);


        if (!tracking) {

            return res.status(404).json({

                success: false,
                message: "Tracking status not found"

            });

        }



        tracking.status = status;
        tracking.date = date;
        tracking.completed = completed;



        await order.save();



        res.status(200).json({

            success: true,

            message: "Tracking updated",

            tracking: order.tracking

        });



    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}