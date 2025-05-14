import mongoose from 'mongoose'

let SubProductSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,
},
description:{
    type:String,
    required:true,
},
catName:{
    type:String,
    default:""
},


brand:{
    type:String,
    default:''
},
price:{
    type:Number,
    default:0,
},
images:[
{
    type:String,
    required:true,
}
],

category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"AccessoryList",
    required:true
},



countInStock:{
    type:Number,
    required:true,
},
// rating:{
//     type:Number,
//     default:0,

// },
oldprice:{
    type:Number,
    default:0,
    required:true,
},
isFeatured:{
    type:Boolean,
    default:false,
},
// discount:{
//     type:Number,
//     required:true
// },
// productRAM:[
//     {
//         type : mongoose.Schema.Types.ObjectId,
//         ref:'Ram',
        

//     }
// ],
// productWEIGHT:[
//     {
//         type : mongoose.Schema.Types.ObjectId,
//         ref:'Weight',
        
//     }
// ],
// productSIZE:[
//     {
//         type : mongoose.Schema.Types.ObjectId,
//         ref:'Size',
        

//     }
// ],
phoneSpecs: {
    weight: {
      type: String,
      default: "",
    },
    batteryCapacity: {
      type: String,
      default: "",
    },
    material: {
      type: String,
      default: "",
    },
    waterResistance: {
      type: String,
      default: "",
    },
   
    connectivity: {
      type: String,
      default: "",
    },
    chargingTime: {
      type: String,
      default: "",
    },
    backupTime: {
      type: String,
      default: "",
    },
    warranty: {
      type: String,
      default: "",
    },
  
    color: {
      type: [String],
      default: "",
    },
 
  },
  offer: {
    type: Boolean,
    default: false,
},
type:{
  type:String,
  default:'accessory'
}



},{timestamps:true})
export default mongoose.model("AccessoryProduct",SubProductSchema)


