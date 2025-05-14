import mongoose from 'mongoose'

let ramSchema = new mongoose.Schema({

name:{
    type:String,
    default:null,
    lowercase:true,
},


},{timestamps:true})
export default mongoose.model("Ram",ramSchema)


