
import { FaUserCircle } from "react-icons/fa";

import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import {   IoMdCart } from "react-icons/io";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useEffect, useState } from "react";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from '@mui/material/Pagination';
import { IoSearchSharp } from "react-icons/io5";

import { MyContext } from "../App";
import {  Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert,  Snackbar } from "@mui/material";
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
 

const ProductList = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [categoryBy, setCategoryBy] = React.useState('');
  const [subCategoryBy, setSubCategoryBy] = React.useState('');
  let [prodductList,setProductList] = useState([])
  let [accProductList,setAccProductList] = useState([])
  let [currentPage,setCurrentPage] = useState(1)
  let [currentAccPage,setCurrentAccPage] = useState(1)
      let [allCategories, setAllCategories] = useState({});
      let [allAccessory, setAllAccessory] = useState({});
      const [productLength, setProductLength] = useState(0);
const [accProductLength, setAccProductLength] = useState(0);
const [combinedLength, setCombinedLength] = useState(0);
        let perPage = 10
      
  
let context = useContext(MyContext)
  const openList = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseList = () => {
    setAnchorEl(null);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  let navigate = useNavigate()
          const [open, setOpen] = React.useState({open:false,message:'',severity:''});
  
          const handleChange = (e) => {
            const value = e.target.value;
          
            fetchProductWithSearch(value);
        
          };
          const handleAccChange = (e) => {
            const value = e.target.value;
          
            fetchAccProductWithSearch(value);
        
          };
let fetchProductWithSearch = async (searchQuery)=>{
  context.setProgress(30)
try {
  let result = await axios.get(`${BASE_URL}/search/product?q=${searchQuery}`,{
   
    params:{
      
      perPage:perPage
    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })
  
  console.log(result.data)
  setTimeout(() => {
    setProductList(result.data)
  }, 1000);
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}
}
let fetchAccProductWithSearch = async (searchQuery)=>{
  context.setProgress(30)
try {
  let result = await axios.get(`${BASE_URL}/search/accessory?q=${searchQuery}`,{
   
    params:{
      
      perPage:perPage
    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })
  
  console.log(result.data)
  setTimeout(() => {
    setAccProductList(result.data)
  }, 1000);
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}
}
let allProduct = async (page=1)=>{
  context.setProgress(30)
try {
  let result = await axios.get(`${BASE_URL}/products/all`,{
    params:{
      page,
      perPage:perPage
    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })
  
console.log()
setProductLength(result.data?.productLength || 0);
  setProductList(result.data)
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}

}
let allAccProduct = async (page=1)=>{
  context.setProgress(30)
try {
  let result = await axios.get(`${BASE_URL}/subProduct/all`,{
    params:{
      page,
      perPage:perPage
    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })
  
  console.log(result.data?.productLength)
  setAccProductLength(result.data?.productLength || 0);
  setAccProductList(result.data)
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}

}
let filterProducts = async (catName)=>{
  context.setProgress(30)

try {
  let result = await axios.get(`${BASE_URL}/products/all`,{
    params:{
      catName:catName,

    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })

  setProductList(result.data)
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}
}

let filterAccProducts = async (catName)=>{
  context.setProgress(30)
console.log(catName)
try {
  let result = await axios.get(`${BASE_URL}/subProduct/all`,{
    params:{
      catName:catName,
   
      
    }
  },{
    withCredentials:true,
    headers:{
      'Content-Type':"multipart/form-data"
    }
  })

  setAccProductList(result.data)
  context.setProgress(100)

} catch (error) {
  console.log(error)
  context.setProgress(100)

}
}




  let allCategory = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/category/all`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(result.data)
            setAllCategories(result.data);
        } catch (error) {
            console.log(error);
        }
    };
  let allAccessoryList = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/accessory/all`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // console.log(result.data)
            setAllAccessory(result.data);
        } catch (error) {
            console.log(error);
        }
    };


let handleDelete = async (id)=>{
   if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
  context.setProgress(30)

  try {
    let result = await axios.delete(`${BASE_URL}/products/delete/${id}`,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
    setOpen({open:true,message:result?.data?.message,severity:'success'})

        await allProduct(currentPage)
        if(prodductList.products && prodductList.products.length ===1 && currentPage >1){
          setCurrentPage(currentPage-1)
          await allProduct(currentPage-1)
        }
        else{
          await allProduct(currentPage)
        }
        context.setProgress(100)
 
} catch (error) {
    console.log(error)
    setOpen({open:true,message:error?.response?.data?.message,severity:'error'})
  context.setProgress(100)

}
}
let handleAccDelete = async (id)=>{
   if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
  context.setProgress(30)

  try {
    let result = await axios.delete(`${BASE_URL}/subProduct/delete/${id}`,{
        withCredentials:true,
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
    setOpen({open:true,message:result?.data?.message,severity:'success'})

        await allAccProduct(currentAccPage)
        if(prodductList.products && prodductList.products.length ===1 && currentAccPage >1){
          setCurrentAccPage(currentAccPage-1)
          await allAccProduct(currentAccPage-1)
        }
        else{
          await allAccProduct(currentAccPage)
        }
        context.setProgress(100)
 
} catch (error) {
    console.log(error)
    setOpen({open:true,message:error?.response?.data?.message,severity:'error'})
    context.setProgress(100)

}
}

let handlePaginationChange = async(e,value)=>{
  context.setProgress(30)
 setCurrentPage(value)
  allProduct(value)
  context.setProgress(100 )
}
let handleAccPaginationChange = async(e,value)=>{
  context.setProgress(30)
 setCurrentAccPage(value)
  allAccProduct(value)
  context.setProgress(100 )
}





  useEffect(()=>{

      context.setIshideHeaderSideBar(false)
      allProduct(currentPage)
      allAccProduct(currentAccPage)
  },[])
  useEffect(() => {
    setCombinedLength(productLength + accProductLength);
  }, [productLength, accProductLength]);
  

  useEffect(()=>{
    // window.scrollTo(0,0)
    allCategory()
    allAccessoryList()
  },[])
  return (
    <>
   
    <div className="p-3 ">
    <div className="w-full  flex flex-col xs:flex-col sm:flex-row justify-between gap-2 p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-xl xs:text-lg font-semibold">Product List</h3>
  </div>

  <div role="presentation" className="flex gap-2 items-center">
    <Breadcrumbs aria-label="breadcrumb" className="text-base xs:text-sm">
      <StyledBreadcrumb
        className="text-base xs:text-sm"
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb
        className="text-base xs:text-sm"
        sx={{ cursor: "default" }}
        label="Products"
      />
      <StyledBreadcrumb
        className="text-base xs:text-sm"
        sx={{ cursor: "default" }}
        label="Product List"
      />
    </Breadcrumbs>
  </div>
</div>

   
                
                   <div className="mt-4 bg-white p-6 rounded-xl">
                                  <div>
                                  <div>
                        <div className="flex w-full justify-between">
                    <h2 className="text-lg font-bold xs:text-[15px] text-gray-700"> Mobile Products</h2>
            <Link to={'/admin/product/upload'}><button className='bg-green-500 px-3 font-semibold text-white rounded-md xs:text-[15px]  p-2 hover:bg-green-600'>Add Product</button></Link>

                        </div>
                    </div>
                                    <div className=" flex items-end justify-between">
                
                
                                    <div className="w-[200px] xs:w-[150px] ">
                                       <h4 className="text-gray-700 mb-1">Category By</h4>
                                        <FormControl size="small" className="w-[100%] xsp:w-[100px] xs:w-[150px] max-w-[500px]">
                        <Select
                          value={categoryBy}
                          onChange={(e)=>setCategoryBy(e.target.value)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                         <MenuItem onClick={() => allProduct()} value="">
                  <em>None</em>
                </MenuItem>
                          {allCategories &&
                                                                allCategories.categories &&
                                                                allCategories.categories.map((category) => {
                                                                    return (
                                                                        <MenuItem
                                                                            className="capitalize"
                                                                            key={category._id}
                                                                            value={category._id}
                                                                            onClick={()=>{
                                                                               filterProducts(category?.name)
                                                                            }}
                                                                        >
                                                                            {category.name}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                        </Select>
                      
                      </FormControl>
                                       </div>
                
                                      <div className="  w-[400px] flex justify-end">
                                      <div className="flex items-center bg-green-100 rounded-md px-2 py-2 w-full max-w-[500px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
                  <IoSearchSharp className="text-2xl xs:text-lg text-gray-600" />
                  <input
                    type="text"
                    onChange={handleChange}
                    placeholder="Search here..."
                    className="ml-2 w-full bg-transparent outline-none lg:text-[16px] lg:py-1 xs:text-[12px]"
                  />
                </div>
                
                                       </div>
                                    </div>
                                    
                                  </div>
                           
                                            <div className="">
                                            <div className="relative mt-3 bg-white pb-3 min-h-[150px] max-h-[500px] overflow-y-auto">
                  <table className="w-full relative text-sm  text-left  rtl:text-right">
                    <thead className="text-xs mb-2 sticky z-20 top-0 text-white uppercase bg-green-500 ">
                      <tr>
                       
                        <th scope="col" className="px-6 py-3">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                
                        <th scope="col" className="px-6 py-3">
                          price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                          ram
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                          action
                        </th>
                       
                      </tr>
                    </thead>
                    <tbody className="relative">
                      {
                         prodductList?.products?.length === 0 ?  <div className=" absolute left-[50%] translate-x-[-50%] ">
                         <h2 className="text-xl font-semibold mt-5 text-red-500">No Data Available</h2>
                      </div> :(
                         prodductList&& prodductList.products &&
                         prodductList.products.map((product)=>{
                          
                           return(
                              <tr key={product._id} className="bg-gray-50  border-b ">
                        
                         <td className="py-3 ">
                         <div className="flex   px-4 gap-5">
                          <div >
                          <div className="w-[60px] rounded-lg shadow-sm shadow-gray-400 h-[60px] bg-white">
                             <img className="w-[60px] h-full rounded-lg object-fill" src={product.images[0]} alt="product" />
                           </div>
                          </div>
                       <div className="w-70%">
                       <div className="w-[100px]">
                        <Link to={`/admin/product/details/${product._id}`}>
                        <h4 className="overflow-hidden whitespace-nowrap font-bold text-ellipsis first-letter:capitalize">{product.name}</h4>
                        
                        </Link>
                         <p className="text-ellipsis overflow-hidden leading-[18px] whitespace-nowrap text-[14px] first-letter:capitalize">{product.description}
                 </p>
                        </div>
                       </div>
                         </div>
                 
                         </td>
                         <td className="pl-4 first-letter:capitalize text-[16px] ">
                          {product?.catName}
                         </td>
                       
                         {/* <td className="pl-4 first-letter:capitalize text-[15px] ">
                          {product.brand}
                         </td> */}
                         <td className="pl-4 text-[15px] ">
                          <span className="line-through">Rs.{product.oldprice}</span>
                          <p className="text-red-600">Rs.{product.price}</p>
                         </td>
                         <td className="pl-4 text-[15px] ">
                         {product.countInStock}
                         </td>
                     
                        
                         <td>
                  <div className="pl-4 flex flex-wrap w-[130px] gap-1 items-center min-h-20 subList text-[13px]">
                {product.productRAM &&  <span className="bg-green-500 text-white p-1 px-2 rounded-md uppercase">
                        {product.productRAM}
                      </span>}
                  </div>
                </td>
                
                {/* Product WEIGHT */}
                {/* <td>
                  <div className="pl-4 flex gap-1 flex-wrap w-[130px] items-center min-h-20 subList text-[13px]">
                    {product?.productWEIGHT?.map((weight, index) => (
                      <span className="bg-green-500 text-white  p-1 px-2 rounded-md uppercase" key={index}>
                        {weight.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="pl-4 flex gap-1 flex-wrap w-[130px] items-center min-h-20 subList text-[13px]">
                    {product?.productSIZE?.map((weight, index) => (
                      <span className="bg-green-500 text-white  p-1 px-2 rounded-md uppercase" key={index}>
                        {weight.name}
                      </span>
                    ))}
                  </div>
                </td> */}
                        
                         <td className="px-6   ">
                          <div className="flex">
                           <button onClick={()=>navigate(`/admin/product/details/${product._id}`)} className=" bg-pink-500 p-2 rounded-lg scale-90 "><IoEye className="text-[16px] text-white"/></button>
                           <button  onClick={()=>navigate(`/admin/product/edit/${product._id}`)} className="bg-green-600 p-2 rounded-lg scale-90"><MdEdit className="text-[16px] text-white"/></button>
                           <button onClick={()=>handleDelete(product._id)} className="bg-red-500 p-2 rounded-lg scale-90"><MdDelete className="text-[16px] text-white"/></button>
                          </div>
                         </td>
                       </tr>
                           )
                         })
                      )
                      }
                     
                     
                      
                    </tbody>
                    </table>
                    
                    </div>
                    {
                      prodductList && prodductList.products&&
                      prodductList.products.length > 0 ? 
                      <div className="  flex m-4">
                      
                      <div className="ml-auto ">
                      <Pagination count={prodductList.totalPages || 1}  color="primary" showFirstButton showLastButton onChange={handlePaginationChange} page={currentPage}/>
                      </div>
                  
                      </div> : <div>
                        
                      </div>
                    }
                   
                
                          
                                            </div>
                                </div>

                                <div className="mt-4 bg-white p-6 rounded-xl">
                  <div>
                  <div className="flex w-full justify-between">
                    <h2 className="text-lg font-bold xs:text-[14px] text-nowrap text-gray-700"> Accessory Products</h2>
            <Link to={'/admin/add-sub-products'}><button className='bg-green-500 px-3 font-semibold text-white rounded-md xs:text-[13px] p-2 xs:px-1 hover:bg-green-600'>Add Accessory</button></Link>

                        </div>
                    <div className=" flex items-end justify-between">


                    <div className="w-[200px] xs:w-[150px] ">
                       <h4 className="text-gray-700 mb-1">Filter By</h4>
                        <FormControl size="small" className="w-[100%] xs:w-[100px] max-w-[500px]">
        <Select
          value={subCategoryBy}
          onChange={(e)=>setSubCategoryBy(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
         <MenuItem onClick={() => allProduct()} value="">
  <em>None</em>
</MenuItem>
          {allAccessory &&
                                                allAccessory.accessories &&
                                                allAccessory.accessories.map((category) => {
                                                    return (
                                                        <MenuItem
                                                            className="capitalize"
                                                            key={category._id}
                                                            value={category._id}
                                                            onClick={()=>{
                                                               filterAccProducts(category?.name)
                                                            }}
                                                        >
                                                            {category.name}
                                                        </MenuItem>
                                                    );
                                                })}
        </Select>
      
      </FormControl>
                       </div>

                       <div className="  w-[400px] flex justify-end">
                      <div className="flex items-center bg-green-100 rounded-md px-2 py-2 w-full max-w-[500px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px]">
  <IoSearchSharp className="text-2xl xs:text-lg text-gray-600" />
  <input
    type="text"
    onChange={handleAccChange}
    placeholder="Search here..."
    className="ml-2 w-full bg-transparent outline-none lg:text-[16px] lg:py-1 xs:text-[12px]"
  />
</div>

                       </div>
                    </div>
                    
                  </div>
           
                            <div className="">
                            <div className="relative mt-3 bg-white pb-3 min-h-[150px] max-h-[500px] overflow-y-auto">
  <table className="w-full relative text-sm  text-left  rtl:text-right">
    <thead className="text-xs mb-2 sticky z-20 top-0 text-white uppercase bg-green-500 ">
      <tr>
       
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
    
        {/* <th scope="col" className="px-6 py-3">
          Brand
        </th> */}
        <th scope="col" className="px-6 py-3">
          price
        </th>
        <th scope="col" className="px-6 py-3">
          stock
        </th>
     
        
      
        
        <th scope="col" className="px-6 py-3">
          action
        </th>
       
      </tr>
    </thead>
    <tbody className="relative">
      {
         accProductList?.products?.length === 0 ?  <div className=" absolute left-[50%] translate-x-[-50%] ">
         <h2 className="text-xl font-semibold mt-5 text-red-500">No Data Available</h2>
      </div> :(
         accProductList&& accProductList.products &&
         accProductList.products.map((product)=>{
          
           return(
              <tr key={product._id} className="bg-gray-50  border-b ">
        
         <td className="py-3 ">
         <div className="flex   px-4 gap-5">
          <div >
          <div className="w-[60px] rounded-lg shadow-sm shadow-gray-400 h-[60px] bg-white">
             <img className="w-[60px] h-full rounded-lg object-fill" src={product.images[0]} alt="product" />
           </div>
          </div>
       <div className="w-70%">
       <div className="w-[100px]">
        <Link to={`/admin/accessoryProduct/details/${product._id}`}>
        <h4 className="overflow-hidden whitespace-nowrap font-bold text-ellipsis first-letter:capitalize">{product.name}</h4>
        
        </Link>
         <p className="text-ellipsis overflow-hidden leading-[18px] whitespace-nowrap text-[14px] first-letter:capitalize">{product.description}
 </p>
        </div>
       </div>
         </div>
 
         </td>
         <td className="pl-4 first-letter:capitalize text-[16px] ">
          {product?.catName}
         </td>
       
         {/* <td className="pl-4 first-letter:capitalize text-[15px] ">
          {product.brand}
         </td> */}
         <td className="pl-4 text-[15px] ">
          <span className="line-through">Rs.{product.oldprice}</span>
          <p className="text-red-600">Rs.{product.price}</p>
         </td>
         <td className="pl-4 text-[15px] ">
         {product.countInStock}
         </td>
    
        
      

{/* Product WEIGHT */}
{/* <td>
  <div className="pl-4 flex gap-1 flex-wrap w-[130px] items-center min-h-20 subList text-[13px]">
    {product?.productWEIGHT?.map((weight, index) => (
      <span className="bg-green-500 text-white  p-1 px-2 rounded-md uppercase" key={index}>
        {weight.name}
      </span>
    ))}
  </div>
</td>
<td>
  <div className="pl-4 flex gap-1 flex-wrap w-[130px] items-center min-h-20 subList text-[13px]">
    {product?.productSIZE?.map((weight, index) => (
      <span className="bg-green-500 text-white  p-1 px-2 rounded-md uppercase" key={index}>
        {weight.name}
      </span>
    ))}
  </div>
</td> */}
        
         <td className="px-6   ">
          <div className="flex">
           <button onClick={()=>navigate(`/admin/accessoryProduct/details/${product._id}`)} className=" bg-pink-500 p-2 rounded-lg scale-90 "><IoEye className="text-[16px] text-white"/></button>
           <button  onClick={()=>navigate(`/admin/accessoryProduct/edit/${product._id}`)} className="bg-green-600 p-2 rounded-lg scale-90"><MdEdit className="text-[16px] text-white"/></button>
           <button onClick={()=>handleAccDelete(product._id)} className="bg-red-500 p-2 rounded-lg scale-90"><MdDelete className="text-[16px] text-white"/></button>
          </div>
         </td>
       </tr>
           )
         })
      )
      }
     
     
      
    </tbody>
    </table>
    
    </div>
    {
      prodductList && prodductList.products&&
      prodductList.products.length > 0 ? 
      <div className="  flex m-4">
      
      <div className="ml-auto ">
      <Pagination count={accProductList.totalPages || 1}  color="primary" showFirstButton showLastButton onChange={handleAccPaginationChange} page={currentAccPage}/>
      </div>
  
      </div> : <div>
        
      </div>
    }
   

          
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
    </>
  )
}

export default ProductList