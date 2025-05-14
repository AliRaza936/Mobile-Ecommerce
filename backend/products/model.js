import mongoose from 'mongoose'

let productShema = new mongoose.Schema({

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


// brand:{
//     type:String,
//     default:''
// },
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
    ref:"Category",
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
productRAM: {
  type: String,

},
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
    displaySize: {
      type: String,
      default: "",
    },
    batteryCapacity: {
      type: String,
      default: "",
    },
    camera: {
      type: String,
      default: "",
    },
    processor: {
      type: String,
      default: "",
    },
   
    storage: {
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




},{timestamps:true})
export default mongoose.model("Product",productShema)


