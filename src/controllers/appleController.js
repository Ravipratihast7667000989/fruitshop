import AppleModel from "../models/appleModel.js";
import cloudinary from "../utils/cloudinary.js";



// ===============================
// ADD PRODUCT
// ===============================

export const addProduct = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "apple-products"
        });

        // Save product
        const product = await AppleModel.create({

            productName: req.body.productName,

            category: req.body.category,

            price: Number(req.body.price),

            unit: req.body.unit,

            description: req.body.description,

            image: {
                url: result.secure_url,
                public_id: result.public_id
            }

        });

        res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};







// ===============================
// GET ALL PRODUCTS
// ===============================


export const getProducts = async (req, res) => {


    try {


        const products = await AppleModel.find()
            .sort({
                createdAt: -1
            });



        res.status(200).json({

            success: true,

            products

        });


    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};








// ===============================
// GET SINGLE PRODUCT
// ===============================


export const getSingleProduct = async (req, res) => {


    try {


        const product =
            await AppleModel.findById(req.params.id);



        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }



        res.status(200).json({

            success: true,

            product

        });


    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};








// ===============================
// SEARCH PRODUCT
// ===============================


export const searchProduct = async (req, res) => {


    try {


        const keyword =
            req.query.name || "";



        const products =
            await AppleModel.find({


                name: {

                    $regex: keyword,

                    $options: "i"

                }


            });



        res.status(200).json({

            success: true,

            products

        });


    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};








// ===============================
// UPDATE PRODUCT
// ===============================


export const updateProduct = async (req, res) => {


    try {


        const product =
            await AppleModel.findById(req.params.id);



        if (!product) {

            return res.status(404).json({

                success: false,

                message: "Product not found"

            });

        }




        // update image if new image selected

        if (req.file) {



            if (product.image?.public_id) {


                await cloudinary.uploader.destroy(

                    product.image.public_id

                );

            }



            product.image = {


                url: req.file.path,


                public_id: req.file.filename


            };


        }



        product.productName =
            req.body.productName || product.productName;



        product.category =
            req.body.category || product.category;



        product.price =
            req.body.price || product.price;



        product.unit =
            req.body.unit || product.unit;



        product.description =
            req.body.description || product.description;



        await product.save();



        res.status(200).json({

            success: true,

            message: "Product Updated Successfully",

            product

        });


    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};








// ===============================
// DELETE PRODUCT
// ===============================


export const deleteProduct = async (req, res) => {


    try {


        const product =
            await AppleModel.findById(req.params.id);



        if (!product) {


            return res.status(404).json({

                success: false,

                message: "Product not found"

            });


        }




        // Delete Cloudinary Image

        if (product.image?.public_id) {


            await cloudinary.uploader.destroy(

                product.image.public_id

            );


        }




        // Delete MongoDB Data


        await AppleModel.findByIdAndDelete(

            req.params.id

        );




        res.status(200).json({

            success: true,

            message: "Product Deleted Successfully"

        });


    }
    catch (error) {


        res.status(500).json({

            success: false,

            message: error.message

        });


    }


};