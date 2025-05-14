import React, { useState, useEffect } from "react";
import { Alert, Button, Chip, CircularProgress, Snackbar } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import format from 'format-number'
import axios from "axios";
import moment from "moment";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useContext } from "react";
import { MyContext } from "../App";
import {Link} from 'react-router-dom'
import BASE_URL from "../../apiConfig";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
            color: "#5fd90d",
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  let [ordersPerPage,setOrdersPerPage] = useState(10)
            const [open, setOpen] = React.useState({open:false,message:'',severity:''});
  let context = useContext(MyContext)

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  const fetchOrders = async () => {
    context.setProgress(30)
    try {
      const response = await axios.get(`${BASE_URL}/orders/allOrders`);
      console.log(response)
      setOrders(response.data.orderLists);
    context.setProgress(100)

      setFilteredOrders(response.data.orderLists);
    } catch (error) {
      console.error("Error fetching orders:", error);
    context.setProgress(100)

    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
     if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
    try {
     let result =  await axios.put(`${BASE_URL}/orders/changeStatus/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, orderStatus: newStatus } : order))
      );
      
      setFilteredOrders((prevOrders) =>
        prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
    )
);
setOpen({open:true,message:result?.data?.message,severity:'success'})
    
    } catch (error) {
        setOpen({open:true,message:error.response.data.message,severity:'error'})
      console.error("Error updating status:", error);

    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleOpenDialog = (products) => {
    setSelectedProducts(products);
    setOpenDialog(true);
};
  useEffect(() => {
    handleFilterChange();
  }, [statusFilter, timeFilter]);


  const handleFilterChange = () => {
    if (!orders || !Array.isArray(orders)) {
        console.error("Orders data is not available yet.");
        return;
      }
    
    let filtered = [...orders]; // Create a copy to avoid modifying the original array
  
    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
  
    if (timeFilter) {
      const cutoffTime = moment().subtract(parseInt(timeFilter), "hours");
      filtered = filtered.filter((order) => moment(order.createdAt).isAfter(cutoffTime));
    }
  
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to page 1 when filters change
  };
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:items-center p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-base sm:text-xl font-semibold">All Orders</h3>
  </div>
  <div role="presentation" className="flex gap-2 items-center">
    <Breadcrumbs aria-label="breadcrumb" className="text-sm sm:text-base">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        label="Orders"
      />
    </Breadcrumbs>
  </div>
</div>

      <div className="flex space-x-4 my-4">
        <select className="p-2 border outline-none" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="p-2 border outline-none" onChange={(e) => setTimeFilter(e.target.value)}>
          <option value="">All Time</option>
          <option value="1">Last Hour</option>
          <option value="12">Last 12 Hours</option>
          <option value="24">Last 24 Hours</option>
          <option value="48">Last 2 Days</option>
          <option value="168">Last Week</option>
          <option value="336">Last 2 Week</option>
          <option value="720">Last Month</option>
          <option value="8760">Last Year</option>
        </select>
      </div>
      <div className="overflow-auto max-h-[500px] bg-white shadow-md rounded-lg">
  <table className="w-full">
    <thead className="bg-green-700 text-white sticky top-0">
      <tr>
        <th className="p-2 text-nowrap ">Order ID</th>
        <th className="p-2 text-nowrap">Payment ID</th>
        <th className="p-2 text-nowrap">Products</th>
        <th className="p-2 text-nowrap">Name</th>
        <th className="p-2 text-nowrap">Phone</th>
        <th className="p-2 text-nowrap">Address</th>
        <th className="p-2 text-nowrap">Zip Code</th>
        <th className="p-2 text-nowrap">Total</th>
        <th className="p-2 text-nowrap">Email</th>
        <th className="p-2 text-nowrap">User ID</th>
        <th className="p-2 text-nowrap">Status</th>
        <th className="p-2 text-nowrap">Date</th>
      </tr>
    </thead>
    <tbody>
      {currentOrders.slice(0)?.reverse()?.map((order) => (
        <tr key={order._id} className="border-b">
          <td className="p-2 text-nowrap h-[80px]">{order._id}</td>
          <td className="p-2 text-nowrap uppercase text-center">{order.method}</td>
       <td  onClick={() => handleOpenDialog(order.products)} className="p-2 text-nowrap hover:underline text-blue-600 cursor-pointer">Click here to view</td>
          <td className="p-2 text-nowrap">{order.fullName}</td>
          <td className="p-2 text-nowrap">{order.phoneNumber}</td>
          <td className="p-2 text-nowrap">{order.address}</td>
          <td className="p-2 text-nowrap">{order.zipCode}</td>
          <td className="p-2 text-nowrap">Rs.{format()(order.amount)}</td>
          <td className="p-2 text-nowrap">{order.email}</td>
          <td className="p-2 text-nowrap">{order.userId}</td>
          <td className="p-2 text-nowrap">
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className={`p-1 outline-none border rounded text-white 
                ${order.status === "pending" ? "bg-yellow-500" : ""} 
                ${order.status === "confirmed" ? "bg-blue-500" : ""} 
                ${order.status === "shipped" ? "bg-purple-500" : ""} 
                ${order.status === "delivered" ? "bg-green-500" : ""} 
                ${order.status === "cancelled" ? "bg-red-500" : ""}`
              }
            >
             <option value="pending" className="bg-white text-black">Pending</option>
  <option value="confirmed" className="bg-white text-black">Confirmed</option>
  <option value="shipped" className="bg-white text-black">Shipped</option>
  <option value="delivered" className="bg-white text-black">Delivered</option>
  <option value="cancelled" className="bg-white text-black">Cancelled</option>
            </select>
          </td>
          <td className="p-2 text-nowrap">{moment(order.createdAt).format("DD MMM YYYY, hh:mm A")}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

<Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle className="font-semibold text-xl">Product Details</DialogTitle>
                <DialogContent>
                    <div className="overflow-auto max-h-[400px]">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 border">Image</th>
                                    <th className="p-3 border">Product Id</th>
                                    <th className="p-3 border text-nowrap">Product Name</th>
                                    <th className="p-3 border">Price</th>
                                    <th className="p-3 border">Quantity</th>
                                    <th className="p-3 border">Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((product, index) => (
                                    <tr key={index} className="border">
                                        <td className="p-3 border text-center">
                                            <img src={product?.productId?.images[0]} alt={product.name} className="w-16 h-18 object-cover mx-auto" />
                                        </td>
                                        <td className="p-3 border cursor-pointer hover:underline text-blue-500">

                                        <Link to={`/admin/${product?.modelType === 'AccessoryProduct' ? 'accessoryProduct' : 'product'}/details/${product?.productId?._id}`}>
  {product?.productId?._id}
</Link>


                                        </td>
                                        <td className="p-3 border text-nowrap ">{product?.productId?.name}</td>
                                        <td className="p-3 border text-center">Rs.{format()(product.price)}</td>
                                        <td className="p-3 border text-center">{product.quantity}</td>
                                        <td className="p-3 border text-center">{product.color}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button variant="contained" color="primary" onClick={() => setOpenDialog(false)}>
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>




<div className="flex justify-between items-center mt-4 bg-white p-3 rounded-lg shadow-md">
  {/* Rows Per Page Dropdown */}
  <div className="flex items-center space-x-2">
    <span className="xs:text-[13px]">Rows per page:</span>
    <select
      className="p-1 xs:scale-95 border outline-none rounded"
      value={ordersPerPage}
      onChange={(e) => {
        setOrdersPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when changing rows per page
      }}
    >
      <option value="10">10</option>
      <option value="25">25</option>
      <option value="50">50</option>
      <option value="100">100</option>
    </select>
  </div>

  {/* Page Info */}
  <div className="xs:text-[13px]">
    {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length}
  </div>

  {/* Navigation Buttons */}
  <div className="flex space-x-2">
    <button
      className={`px-3 py-1 rounded ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-gray-300"}`}
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      ❮
    </button>
    <button
      className={`px-3 py-1 rounded ${
        indexOfLastOrder >= filteredOrders.length ? "text-gray-400 cursor-not-allowed" : "bg-gray-300"
      }`}
      disabled={indexOfLastOrder >= filteredOrders.length}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      ❯
    </button>
  </div>
</div>
 <Snackbar open={open.open} autoHideDuration={1000} onClose={handleClose}>
                        <Alert
                          onClose={handleClose}
                          severity={open.severity}
                          variant="filled"
                          sx={{ width: '100%' }}
                        >
                          {open.message}
                        </Alert>
                      </Snackbar>
    </div>
  );
};

export default OrderList;
