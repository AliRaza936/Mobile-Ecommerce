import mongoose from 'mongoose'

let connectDB = async()=>{
    try {
         
        let con = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connect with MongoDB ${con.connection.host}`)
    } catch (error) {
        console.log(`Cannot connect with MongoDB ${error}`)
    }
}
export default connectDB