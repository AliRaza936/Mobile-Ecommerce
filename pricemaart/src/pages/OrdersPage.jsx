import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment'
import { MyContext } from "../App";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import format from 'format-number'
import BASE_URL from "../../apiConfig";
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);

    let userId = JSON.parse(localStorage.getItem('user')).userId

    try {
      const response = await axios.get(`${BASE_URL}/orders/all/${userId}`, {  withCredentials: true });
      setOrders(response?.data?.orderLists || []);
      console.log(response.data)
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleOpenDialog = (order) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  // Filter orders based on selected status
  const filteredOrders = filterStatus === "All" 
  ? orders 
  : orders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());
  return (
    
    <div className="py-3">
      <h1>
        
      </h1>
      {orders.length != 0 ?  <div className="max-w-[1200px] min-h-[500px]  mx-auto p-6 bg-white rounded-lg -lg mt-5 py-4">
      
      {/* Status Filter Buttons */}
      <h2 className="text-2xl xs:text-xl mb-5">User Orders List</h2>
      {/* Buttons for sm and up */}
<div className="space-x-4 mb-4 sm:flex xs:hidden">
  {["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map(status => (
    <button
      key={status}
      className={`px-4 py-2 rounded-lg transition ${
        filterStatus === status ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-blue-400"
      }`}
      onClick={() => setFilterStatus(status)}
    >
      {status}
    </button>
  ))}
</div>

{/* Dropdown for xs screens */}
<div className="mb-4 sm:hidden xs:flex">
  <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded"
  >
    {["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map(status => (
      <option key={status} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>


      {/* Orders Table */}
     {
      !loading ? (   <div className="grid grid-cols-1 gap-3">
  {filteredOrders.length === 0 ? (
    <div className="col-span-full text-center py-4">No orders found.</div>
  ) : (
    filteredOrders?.slice(0)?.reverse()?.map(order => (
      <div key={order._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
        {/* Order ID */}
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-medium">Order ID:</span> {order._id}
        </div>

        {/* User Info */}
        <div className="md:flex justify-between md:w-[100%]">
<div className=""> 
   <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Name:</span> {order.fullName}
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-medium">Email:</span> {order.email}
        </div>
</div>
<div className="text-sm mb-2">
          <span className="font-medium mr-1">Delivery Status:</span>
          <span className={`px-3 py-1 xs:px-2 rounded-full text-sm  xs:text-[10px] text-white ${
            order.status === "pending" ? "bg-yellow-500" :
            order.status === "confirmed" ? "bg-blue-500" :
            order.status === "shipped" ? "bg-purple-500" :
            order.status === "delivered" ? "bg-green-500" : "bg-red-500"
          }`}>
            {order.status}
          </span>
        </div>
        
        </div>
       

        {/* Address */}
        <div className="text-sm text-gray-700 mb-2 md:w-[60%]">
          <span className="font-medium">Address:</span> {order.address}, {order.city}, {order.country}
        </div>

        {/* Delivery Status */}
       

        {/* View Products */}
        <div className="mb-4">
          <button 
            className="text-blue-500 underline text-sm"
            onClick={() => handleOpenDialog(order)}
          >
            Click To View Products
          </button>
        </div>

        {/* Date */}
        <div className="text-sm text-gray-500 ">
          <span className="font-medium">Date:{moment(order.createdAt).format('DD/MM/YYYY')}</span> 
          <div className="md:text-right mt-4 text-sm font-semibold">
          <span className="mr-2 text-black">Total Amount:</span>
          <span className="">
            Rs. {format()(order?.amount)}
          </span>
        </div>
        </div>
      </div>
    ))
  )}
</div>):<div className="flex justify-center items-center min-h-[250px] w-full p-4">
  {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
  <span>loaidng...</span>
</div>

     }
   


      {/* Product Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          Order Details
          <IconButton 
            aria-label="close" 
            onClick={handleCloseDialog} 
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
  {selectedOrder && (
    <>
      {/* xs screen: Card-style product view */}
      <div className="block sm:hidden space-y-4">
        {selectedOrder.products.map(product => (
          <div key={product._id} className="border rounded-md p-3 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={product?.productId?.images[0]} 
                alt={product?.productId?.name} 
                className="w-12 h-12 object-cover rounded-md" 
              />
              <div className="text-sm font-medium">{product?.productId?.name}</div>
            </div>
            <div className="text-sm text-gray-600"><strong>Quantity:</strong> {product.quantity}</div>
            <div className="text-sm text-gray-600"><strong>Price:</strong> Rs. {format()(product.price)}</div>
            <div className="text-sm text-gray-600"><strong>Color:</strong> {product.color}</div>
          </div>
        ))}

        <div className=" mt-4 xs:text-[14px]  text-base font-semibold">
          <span className="mr-2">Total Amount:</span>
          <span className="">Rs. {format()(selectedOrder.amount)}</span>
        </div>
      </div>

      {/* sm and up: Table view */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-sm">Image</th>
              <th className="border p-2 text-sm text-nowrap">Product Name</th>
              <th className="border p-2 text-sm">Quantity</th>
              <th className="border p-2 text-sm">Price</th>
              <th className="border p-2 text-sm">Color</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.products.map(product => (
              <tr key={product._id} className="border">
                <td className="border p-2 text-center">
                  <img 
                    src={product?.productId?.images[0]} 
                    alt={product.name} 
                    className="w-16 h-16 rounded-md mx-auto" 
                  />
                </td>
                <td className="border text-center p-2  text-sm">{product?.productId?.name}</td>
                <td className="border text-center p-2 text-sm">{product.quantity}</td>
                <td className="border text-center p-2 text-sm">Rs. {format()(product.price)}</td>
                <td className="border text-center p-2 text-sm">{product.color}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="md:text-right xs:text-[5px] mt-4  font-semibold">
          <span className="mr-2">Total Amount:</span>
          <span className="">Rs. {format()(selectedOrder.amount)}</span>
        </div>
      </div>
    </>
  )}
</DialogContent>

       
      </Dialog>
    </div>: <div className="flex flex-col items-center h-[400px] justify-center">
       
        <h2 className="text-[2rem] text-gray-800 "> YOUR ORDER IS EMPTY</h2>
        <Link to={'/'}><button className="bg-primary hover:bg-secondary p-2 flex mt-4 mb-10 items-center text-[1.2rem] gap-2 w-[230px] justify-center rounded-full font-semibold text-white"><IoHome className="text-2xl"/>Continue Shoping</button></Link>
      </div>
      }
    </div>
  );
};

export default OrdersPage;
