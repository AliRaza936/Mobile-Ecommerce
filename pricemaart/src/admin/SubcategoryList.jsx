import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { MdDelete, MdEdit } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { MyContext } from "../App";

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
const SubcategoryList = () => {
    let navigate = useNavigate()
    let context = useContext(MyContext)
     const [open, setOpen] = React.useState({open:false,message:'',severity:''});
     let [allSubCategories, setAllSubCategories] = useState({
       
     });


let allSubCategory = async ()=>{
 try {
     let result = await axios.get('http://localhost:5000/category/subcategory/all',{
         withCredentials: true,
         headers: {
           "Content-Type": "multipart/form-data",
         },
     })
     
     setAllSubCategories(result.data)
    
    
        
 } catch (error) {
     console.log(error)
     setOpen({open:true,message:error.response.data.message,severity:'error'})


 }
}
let deleteSubCategory = async(id)=>{
 if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
 try {
     let result = await axios.delete(`http://localhost:5000/category/subcategory/delete/${id}`,{
         withCredentials:true,
         headers:{
             "Content-Type": "multipart/form-data",
         }
     })
     setOpen({open:true,message:result?.data?.message || 'Category delete successfully',severity:'success'})
     await allSubCategory();

 } catch (error) {
     console.log(error)
     setOpen({open:true,message:error.response.data.message,severity:'error'})
 }
}



const handleClose = (event, reason) => {
 if (reason === 'clickaway') {
   return;
 }

 setOpen(false);
};


const groupedSubcategories = allSubCategories.subCategories ? allSubCategories.subCategories.reduce((acc, subcategory) => {
    const category = subcategory.category.name;
    
    if(!acc[category]){
      acc[category] = []
    }
    acc[category].push(subcategory)
    return acc
  }, {}):{};
 useEffect(()=>{
    allSubCategory()
         context.setProgress(100)
         
 },[])

 useEffect(()=>{
   window.scrollTo(0,0)

 },[])
 
  return (
    <div className="p-4">
    <div className="w-full h-[70px] flex justify-between p-5 rounded-lg bg-white">
       <div>
         <h3 className="text-xl font-semibold">Sub category List</h3>
       </div>
       <div role="presentation" className="flex gap-2 items-center">
         <Breadcrumbs aria-label="breadcrumb">
           <StyledBreadcrumb
             sx={{ cursor: "default" }}
             component="a"
             href="#"
             label="Dashboard"
           />

           <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
           

          
         </Breadcrumbs>
           <Link to={'/category/add/subcategory'}><button className='bg-green-500 px-3 font-semibold text-white rounded-md p-2 hover:bg-green-600'>Add Sub Category</button></Link>
       </div>
     </div>
     <div className=" pb-3 rounded-xl bg-white ">

   <div className="p-3  mt-6">
   <div className="relative pt-5 mb-5 ">

<table className="w-full h-[120px] table table-auto text-sm text-left  rtl:text-right">
   <thead className="text-xs text-white uppercase bg-green-500 ">
     <tr>
      
       <th scope="col" className="px-6 py-3">
         Image
       </th>
       <th scope="col" className="px-6 py-3">
         Category
       </th>
       <th scope="col" className="px-6 text-nowrap py-3">
         Sub Category
       </th>
  
  
      
     </tr>
   </thead>
   <tbody className="relative">
   {
    allSubCategories?.subCategories?.length === 0 ?  <div className=" absolute left-[50%] translate-x-[-50%] ">
    <h2 className="text-xl font-semibold mt-5 text-red-500">No Data Available</h2>
 </div>:
    (
     
        Object.keys(groupedSubcategories).map((category,index)=>{
             return(
                <tr key={index}  className="bg-gray-50 hover:bg-green-100 bg-w border-b">
     
     
     <td className=" p-3 text-[16px] ">
      {
         <div className="w-[50px]  rounded shadow-sm shadow-gray-400 h-[50px] bg-white">
         <img className="w-[50px] h-full rounded object-fill" src={groupedSubcategories[category][0].category.images} alt="product" />
       </div>
      }
     </td>
     <td className=" pl-2 text-gray-700 font-semibold text-[15px] lowercase first-letter:capitalize">
     {category}
     </td>
     <td className=" text-[15px] flex-wrap w-[470px] overflow-y-scroll   subList first-letter:capitalize flex h-20 gap-2 lowercase font-semibold pl-2 text-gray-700">
     {groupedSubcategories[category].map((subcategory) => (
                      <div className="bg-green-500 px-2 text-white flex gap-2  p-1 rounded-md my-auto " key={subcategory._id}>
                        {subcategory.subCategory}
                        <button onClick={()=>deleteSubCategory(subcategory._id)} className="mt-[2px]  text-white"><MdClose/></button>
                      </div>
                    ))}
     </td>
  
     
   
   </tr> 
             )
         })
   
    )
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

export default SubcategoryList