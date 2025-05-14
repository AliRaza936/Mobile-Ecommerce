import mongoose from 'mongoose'
import { type } from 'os'

let orderSchema = new mongoose.Schema({
    
    fullName:{
    type:String,
    required:true,
   },
   phoneNumber:{
    type:Number,
    required:true,
   },
   country:{
    type:String,
    required:true,
   },
   address:{
    type:String,
    required:true,
   },
   zipCode:{
    type:String,
    required:true,
   },
   amount:{
    type:String,
    required:true,
   },
   city:{
    type:String,
    required:true,
   },
   state:{
    type:String,
    required:true,
   },

   
   email:{
    type:String,
    required:true,
   },
 
    
    products:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'products.modelType', // 👈 dynamic reference
              },
              modelType: {
                type: String,
                required: true,
                enum: ['Product', 'AccessoryProduct'], // 👈 allowed models
              },
            
            quantity:{
                type:Number
            },
            price:{
                type:Number
            },
            color:{
                type:String,
            },
            ram:{
                type:String
            },
            size:{
                type:String
            },
            weight:{
                type:String
            },
           
        }
    ],
    method:{
        type:String,
        default:'',
    },
    userId:{
        type:String,
        default:'',
    },
    status:{
        type:String,
        default:'pending',
    }

},{timestamps:true})

export default mongoose.model('Order',orderSchema)