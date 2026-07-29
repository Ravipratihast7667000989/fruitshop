
import cloudinary from "../utils/cloudinary.js";
import Pdf from "../models/pdfModel.js";

export const deletePdf = async (req, res) => {
  try {

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    await cloudinary.uploader.destroy(
      pdf.publicId,
      {
        resource_type: "raw",
      }
    );

    await Pdf.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const uploadPdf = async(req,res)=>{

    try{

        if(!req.file){

            return res.status(400).json({
                success:false,
                message:"PDF Required"
            });

        }

        const pdf = await Pdf.create({

            title:req.body.title,

            pdfUrl:req.file.path,

            publicId:req.file.filename

        });

        res.status(201).json({

            success:true,
            message:"PDF Uploaded",
            pdf

        });

    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



export const getAllPdf = async(req,res)=>{

    const pdfs=await Pdf.find().sort({createdAt:-1});

    res.json({

        success:true,
        pdfs

    });

};



export const downloadPdf=async(req,res)=>{

    const pdf=await Pdf.findById(req.params.id);

    if(!pdf){

        return res.status(404).json({
            success:false,
            message:"PDF Not Found"
        });

    }

    res.redirect(pdf.pdfUrl);

};