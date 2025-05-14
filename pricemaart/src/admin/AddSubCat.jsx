import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";

import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { MyContext } from "../App";
import { FormControl, MenuItem, Select } from "@mui/material";

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

const AddSubCat = () => {
    const [open, setOpen] = React.useState({open:false,message:'',severity:''});
    let context = useContext(MyContext)
      let [allCategories, setAllCategories] = useState({});
      let [categoryChange, setCategoryChange] = useState("");
    

    let navigate = useNavigate()
    let [inputField, setInputField] = useState({
       category: "",
       subCategory: "",
    
     });
  

    let [isLoading,setIsLoading] = useState(false)
  
  
 
  
    let handleChange = (e) => {
      setInputField(() => ({
        ...inputField,
        [e.target.name]: e.target.value,
      }));
    };
    
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
  
    let handleSubmit = async (e) => {
      e.preventDefault();
  
  
      
      if(inputField.category === ''){
        setOpen({open:true,message:'please select category',severity:'error'})
        return
        
      }
      if(inputField.subCategory === ''){
        setOpen({open:true,message:'please add sub category',severity:'error'})
        return
        
      }
      setIsLoading(true)
      context.setProgress(30)
    
      try {
        let result = await axios.post(
          "http://localhost:5000/category/subcategory/create",
          inputField,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setIsLoading(false)
        setOpen({open:true,message:result?.data?.message,severity:'success'})
        setTimeout(() => {
          context.setProgress(100)
          navigate("/admin/category/subcategory/list")
         
        }, 1000);
        
        setInputField(result)
  
        
      } catch (error) {
        
  
        setIsLoading(false)
          
          setOpen({open:true,message:error.response.data.message,severity:'error'})
    
          
        
  
  
      }
    } ;
    let handleCategoryChange = (e) => {
        setCategoryChange(e.target.value);
    
        setInputField(() => ({
          ...inputField,
          category: e.target.value,
        }));
      };
    let allCategory = async () => {
        try {
          let result = await axios.get("http://localhost:5000/category/all", {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    
          setAllCategories(result.data);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
      window.scrollTo(0,0)
      allCategory()
    },[])
    
  return (
    <div className="p-4 ">
      <div className="w-full flex justify-between p-5 rounded-lg bg-white">
        <div>
          <h3 className="text-xl font-semibold">Add Sub Category</h3>
        </div>
        <div role="presentation" className="">
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              sx={{ cursor: "default" }}
              component="a"
              href="#"
              label="Dashboard"
            />

            <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
            <StyledBreadcrumb sx={{ cursor: "default" }} label="Add Sub Category" />
          </Breadcrumbs>
        </div>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mt-5 w-[70%] rounded-lg overflow-hidden">
          <div className="bg-white flex flex-col gap-5 p-4">

          <div className="col-span-2">
                  <label
                    className="font-semibold text-gray-800 m"
                    htmlFor="category"
                  >
                    CATEGORY
                  </label>
                  <FormControl className="capitalize  " fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={categoryChange}
                      className="mt-2"
                      displayEmpty
                      onChange={handleCategoryChange}
                    >
                      <MenuItem value="">
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
                            >
                              {category.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </div>

            <div className="flex gap-2 flex-col">
              <label
                htmlFor="sub"
                className="text-[15px] font-semibold text-gray-700"
              >
                Sub Category
              </label>
              <input
                type="text"
                id="sub"
                className="py-4 outline-none border border-gray-500 px-3 rounded-lg bg-gray-100 "
                placeholder="Enter sub category"
                name="subCategory"
                defaultValue={inputField.subCategory}
                onChange={handleChange}
              />
            </div>
          
            
            <div className="w-full bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300">
              <Button type="submit" className="w-full flex gap-3">
                {" "}
                <span className="text-white text-3xl">
                  <FaCloudUploadAlt />
                </span>{" "}
                <p className="text-white flex items-centerm gap-2 text-lg font-semibold">
                    { isLoading === false ?"publish and view ": <CircularProgress color="inherit " className="loader" />}
                  
                  
                </p>
              </Button>
            </div>
          </div>
        </div>
      </form>
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

export default AddSubCat