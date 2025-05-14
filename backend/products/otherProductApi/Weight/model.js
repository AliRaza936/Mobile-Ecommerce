import mongoose from 'mongoose'

let weightSchema = new mongoose.Schema({

name:{
    type:String,
    default:null,
    lowercase:true,
},


},{timestamps:true})
export default mongoose.model("Weight",weightSchema)


