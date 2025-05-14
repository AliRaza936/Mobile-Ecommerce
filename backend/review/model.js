import mongoose from 'mongoose'

let reviewSchema = new mongoose.Schema({

    review:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    productId:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    }



},{timestamps:true})
export default mongoose.model("Review",reviewSchema)


