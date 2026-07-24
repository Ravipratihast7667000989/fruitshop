import productModel from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";




// SEARCH PRODUCT API

export const searchProduct = async(req,res)=>{

    try{

        const keyword =
        req.query.search;
        
        if(!keyword){

            return res.status(400).json({

                success:false,

                message:"Search keyword required"

            });

        }




        const products =
        await productModel.find({

            productName:{

                $regex:keyword,

                $options:"i"

            }


        });




        res.status(200).json({

            success:true,

            count:products.length,

            products

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

export const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Cloudinary image delete
    if (product.image?.public_id) {
      await cloudinary.uploader.destroy(product.image.public_id);
    }

    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const createProduct = async (req, res) => {
  try {
    const { productName, category, price, description } = req.body;
    console.log(req.file);
console.log(req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Products",
    });

    const product = await productModel.create({
      productName,
      category,
      price,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};