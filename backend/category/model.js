import mongoose from 'mongoose'

let categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
    },
    images:{
        type:[String],
        required:true,
    },
    banner:{
        type:String,
        required:true,
        
    }
  
  
},{timestamps:true})

export default mongoose.model('Category',categorySchema)