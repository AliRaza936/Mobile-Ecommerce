
import orderModel from "../order/model.js";
import salesModel from '../salesData/model.js'

let createOrder = async (req, res) => {
  try {
    const userId = req.params.id; 
let {fullName,phoneNumber,country,address,zipCode,amount,email,products,city,state,method} = req.body

let order = await orderModel.create({
  fullName,phoneNumber,country,address,zipCode,amount,email,products,city,state,method,userId
})

return res
      .status(201)
      .send({
        success: true,
        message:"order create successfully",
        order
        
      });
   

  
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "fail to create order", error });
  }
};
let allOrders = async (req, res) => {
  try {


  
   let userId = req.params.id

    let orderLists = await orderModel.find({userId:userId}).populate('products.productId')

    if(!orderLists){
        return res
        .status(500)
        .send({ success: false });
    }
  
    return res
      .status(201)
      .send({
        success: true,
        orderLists
        
      });
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in fetching all orders items", error });
  }
};
let allAdminOrders = async (req, res) => {
  try {


  
  
  
    let orderLists = await orderModel.find().populate('products.productId')

    if(!orderLists){
        return res
        .status(500)
        .send({ success: false });
    }
  
    return res
      .status(201)
      .send({
        success: true,
        orderLists
        
      });
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in fetching all orders items", error });
  }
};
let singleOrder = async (req, res) => {
  try {


  
   let {id} = req.params
  
    let orderLists = await orderModel.findById(id).populate('products.productId')

    if(!orderLists){
        return res
        .status(500)
        .send({ success: false });
    }
  
    return res
      .status(201)
      .send({
        success: true,
        orderLists
        
      });
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in fetching sinlge order", error });
  }
};
let changeOrderStatus = async (req, res) => {
  try {


  
   let {id} = req.params
   const { status } = req.body;
   if (!status) {
    return res.status(400).json({ message: "Status is required" });
}

  
    let order= await orderModel.findById(id).populate('products.productId')

    if(!order){
        return res
        .status(500)
        .send({ success: false,message: "Order not found" });
    }
    let previousStatus = order.status; // ✅ Store previous status before updating
    order.status = status;
    await order.save();

    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1; // January = 0, so add 1
    let amount = parseFloat(order.amount.toString().replace(/,/g, "")); // ✅ Ensure amount is a number

    let salesData = await salesModel.findOne({ year, month });

    // ✅ If the order is being marked as delivered for the FIRST TIME
    if (status === "delivered" && previousStatus !== "delivered") {
      if (salesData) {
        salesData.totalSales += amount; 
        salesData.totalOrders += 1;
        await salesData.save();
      } else {
        await salesModel.create({
          year,
          month,
          totalSales: amount,
          totalOrders: 1
        });
      }
    }

    // ✅ If the order was delivered but is NOW being changed back, subtract from sales
    if (previousStatus === "delivered" && status !== "delivered") {
      if (salesData) {
        salesData.totalSales -= amount; 
        salesData.totalOrders -= 1;
        await salesData.save();
      }
    }

    return res
      .status(201)
      .send({
        success: true,
        message: "Order status updated successfully",
        order
        
      });
  } catch (error) {
console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in fetching sinlge order", error });
  }
};



export { createOrder,allOrders,singleOrder,allAdminOrders,changeOrderStatus };
