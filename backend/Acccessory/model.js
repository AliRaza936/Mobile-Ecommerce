import mongoose from 'mongoose'

let accessorySchema = new mongoose.Schema({
    name:{
        type:String,
        required : true,
        lowercase:true,
    },
    images:{
        type:[String],
        required:true,
    },
    banner:{
        type:String,
        required:true,
        
    },

  
  
},{timestamps:true})

export default mongoose.model('AccessoryList',accessorySchema)