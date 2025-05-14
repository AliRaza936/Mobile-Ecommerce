import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,lowercase:true },
    phone:{
        type:String,
    },
    password: { type: String,  },
    role: { type: String, enum: ["user", "admin","testAdmin"], default: "user" },
    otpExpires:{type:Date,default:null},
    otpCode: { type: String,default:null },
    verified: { type: Boolean, default: false },
},{timestamps:true})

export default mongoose.model('User',userSchema)