import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { MdDelete, MdEdit } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import { MyContext } from "../App";
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
 
    const CategoryList = () => {
      let navigate = useNavigate()
       let context = useContext(MyContext)
        const [open, setOpen] = React.useState({open:false,message:'',severity:''});
        let [allCategories, setAllCategories] = useState({
          
        });


let allCategory = async ()=>{
    try {
        let result = await axios.get(`${BASE_URL}/category/all`,{
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
        })
        //    result.data.success === true && setOpen({open:true,message:result.data.message,severity:'success'})
          console.log(result)
        setAllCategories(result.data)
       
       
           
    } catch (error) {
        console.log(error)
        setOpen({open:true,message:error.response.data.message,severity:'error'})


    }
}
let deleteCategory = async(id)=>{
   if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
  context.setProgress(30)
  
    try {
        let result = await axios.delete(`${BASE_URL}/category/delete/${id}`,{
            withCredentials:true,
            headers:{
                "Content-Type": "multipart/form-data",
            }
        })
        setOpen({open:true,message:result?.data?.message || 'Category delete successfully',severity:'success'})
        context.setProgress(100)

        await allCategory();

       
    } catch (error) {
        console.log(error)
        context.setProgress(100)

        setOpen({open:true,message:error.response.data.message,severity:'error'})
    }
}



const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


    useEffect(()=>{
     allCategory()
            context.setProgress(100)
            
    },[])

    useEffect(()=>{
      window.scrollTo(0,0)

    },[])
  
  return (
    <div className="p-4">
     <div className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:items-center p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-base sm:text-xl font-semibold">Category List</h3>
  </div>
  <div role="presentation" className="flex gap-2 items-center">
    <Breadcrumbs aria-label="breadcrumb" className="text-sm sm:text-base">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
    </Breadcrumbs>
    <Link to="/admin/category/add">
      <button className="bg-green-500 xs:text-[12px] px-3 font-semibold text-white rounded-md p-2 hover:bg-green-600">
        Add Category
      </button>
    </Link>
  </div>
</div>

      <div className=" pb-3 rounded-xl bg-white ">

    <div className="p-3  mt-6">
    <div className="relative pt-5  overflow-x-auto overflow-y-hidden">

<table className="w-full table table-auto text-sm text-left  rtl:text-right">
    <thead className="text-xs text-white uppercase bg-green-500 ">
      <tr>
       
        <th scope="col" className="px-6 py-3">
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
     
        
        <th scope="col" className="px-6 py-3">
          action
        </th>
       
      </tr>
    </thead>
    <tbody className="">
        {
           allCategories.categories &&
            allCategories.categories
            .map((category,index)=>{
                return(
                   <tr key={index} className="bg-gray-50 hover:bg-green-100 bg-w border-b">
        
        
        <td className=" p-3 text-[16px] ">
         {
            <div className="w-[60px]  rounded shadow-sm shadow-gray-400 h-[70px] bg-white">
            <img className="w-full h-full rounded object-cover" src={category?.images} alt="product" />
          </div>
         }
        </td>
        <td className=" pl-2 text-gray-700 font-semibold text-[15px] lowercase first-letter:capitalize">
        {category?.name}
        </td>
       
     
        
        <td className="px-6   ">
         <div className="flex">
  
          <button onClick={()=>{navigate(`/admin/category/edit/${category._id}`)}} className="bg-green-600 p-2 rounded-lg scale-90"><MdEdit className="text-[16px] text-white"/></button>
          <button onClick={()=>deleteCategory(category._id)} className="bg-red-500 p-2 rounded-lg scale-90"><MdDelete className="text-[16px] text-white"/>
        

          </button>
         
         </div>
        </td>
      </tr> 
                )
            })
        }
      
     
    </tbody>
    </table>
</div>
    </div>
    
      </div>
    <Snackbar open={open.open} autoHideDuration={2000} onClose={handleClose}>
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
  )
}

export default CategoryList