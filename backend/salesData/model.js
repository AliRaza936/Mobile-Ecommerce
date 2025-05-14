import mongoose from 'mongoose'

let salesSchema = new mongoose.Schema({


    year: Number,
    month: Number,
    totalSales: Number,
    totalOrders: Number



},{timestamps:true})
export default mongoose.model("Sale",salesSchema)


