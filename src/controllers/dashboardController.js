import productModel from "../models/productModel.js";


// Total Products + Total Stock + Total Sold + Available Stock

export const productStockDetails = async (req, res) => {

    try {


        // Total Product Count

        const totalProducts =
            await productModel.countDocuments();



        // Total Stock + Total Sold

        const result = await productModel.aggregate([

            {
                $group: {

                    _id: null,

                    totalStock: {
                        $sum: "$stock"
                    },

                    totalSold: {
                        $sum: "$sold"
                    }

                }

            }

        ]);



        const totalStock =
            result[0]?.totalStock || 0;


        const totalSold =
            result[0]?.totalSold || 0;



        const availableStock =
            totalStock - totalSold;




        res.status(200).json({

            success:true,


            // Total number of products
            totalProducts,


            // Total quantity added
            totalStock,


            // Total quantity sold
            totalSold,


            // Remaining quantity
            availableStock


        });



    } catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};