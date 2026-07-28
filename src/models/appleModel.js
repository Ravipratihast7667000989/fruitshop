import mongoose from "mongoose";


const appleSchema = new mongoose.Schema({


    productName: {

        type: String,

        required: true,

        trim: true

    },



    category: {

        type: String,

        required: true,

        trim: true,

        default: "Apple"

    },



    price: {

        type: Number,

        required: true,

        min:0

    },



    unit: {

        type: String,

        required: true,

        enum: [

            "kg",
            "gram",
            "liter",
            "ml",
            "piece",
            "box"

        ],

        default:"kg"

    },



    stock:{

        type:Number,

        default:0

    },



    discount:{

        type:Number,

        default:0

    },



    description: {

        type: String,

        required:true,

        trim:true

    },



    image:{


        url:{

            type:String,

            required:true

        },


        public_id:{

            type:String,

            required:true

        }


    },



    rating:{

        type:Number,

        default:0

    },


    isActive:{

        type:Boolean,

        default:true

    }



},{

    timestamps:true

});



export default mongoose.model(

    "AppleModel",

    appleSchema

);