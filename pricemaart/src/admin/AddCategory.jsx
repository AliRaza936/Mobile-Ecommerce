import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { FaRegImages } from "react-icons/fa";
import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
const AddCategory = () => {
          const [open, setOpen] = React.useState({open:false,message:'',severity:''});
          
  let context = useContext(MyContext)
  let navigate = useNavigate()
  const inputFileRef = useRef(null);
  const inputBannerRef = useRef(null);
  let [inputField, setInputField] = useState({
    name: "", 
   banner:'',
    images: [],
 
  });

  let [selectedImage, setSelectedImage] = useState(null);
  let [selectedBanner, setSelectedBanner] = useState(null);
  let [isLoading,setIsLoading] = useState(false)

  let hanldeImageChange = (e) => {
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let handleBanner = (e) => {
    let file = e.target.files[0];

    if (file) {
      let reader = new FileReader();

      reader.onloadend = () => {
        setSelectedBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
    document.getElementById("inputFile").value = [];

  };
  const handleRemoveBanner = () => {
    setSelectedBanner(null);
    document.getElementById("inputBanner").value = '';

  };

  let hanldeFileChanges = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp','avif']
      let fileFormat = file.name.split('.').pop().toLowerCase()
      if(allowedFormat.includes(fileFormat)){
        hanldeImageChange(e);
      
        handleChange({
          target: {
            name: "images",
            value: e.target.files[0],
          },
        });
      }else{
        setOpen({open:true,message:'Please select valid format image',severity:'error'})
      setSelectedImage(null);
      inputFileRef.current.value = '';
      }

     
    } else {
    
      setSelectedImage(null);
    }
  };
  let hanldeBannerChanges = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp','avif']
      let fileFormat = file.name.split('.').pop().toLowerCase()
      if(allowedFormat.includes(fileFormat)){
        handleBanner(e);
      
        handleChange({
          target: {
            name: "banner",
            value: e.target.files[0],
          },
        });
      }else{
        setOpen({open:true,message:'Please select valid format image',severity:'error'})
      setSelectedBanner(null);
      inputBannerRef.current.value = '';
      }

     
    } else {
    
      setSelectedBanner(null);
    }
  };

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
    
console.log(inputField)
    if(inputField.name =='' ){
        
      setOpen({open:true,message:'Please fill all fields',severity:'error'})

      
      return
    }
    if( selectedImage == null){
        
      setOpen({open:true,message:'Please add image',severity:'error'})

      
      return
    }
    if( selectedBanner == null){
        
      setOpen({open:true,message:'Please add banner',severity:'error'})

      
      return
    }
    
 if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
    context.setProgress(30)
    setIsLoading(true)



    try {
      let result = await axios.post(
        `${BASE_URL}/category/create`,
        inputField,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsLoading(false)
      setOpen({open:true,message:result?.data?.message,severity:'success'})
      setTimeout(() => {
        context.setProgress(100)
        navigate("/admin/category")
       
      }, 1000);
      
      setInputField(result)

      
    } catch (error) {
      
      context.setProgress(100)

      setIsLoading(false)
        
        setOpen({open:true,message:error.response.data.message,severity:'error'})
  
        
      


    }
  } ;
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className="p-4 ">
     <div className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:items-center p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-base sm:text-xl font-semibold">Add Category</h3>
  </div>
  <div role="presentation">
    <Breadcrumbs aria-label="breadcrumb" className="text-sm sm:text-base">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Add Category" />
    </Breadcrumbs>
  </div>
</div>


      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mt-5 md:w-[70%] xs:w-[100%] rounded-lg overflow-hidden">
          <div className="bg-white flex flex-col gap-5 p-4">
            <div className="flex gap-2 flex-col">
              <label
                htmlFor="category"
                className="text-[15px] font-semibold text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category"
                className="py-4 outline-none border border-gray-500 px-3 rounded-lg bg-gray-100 "
                placeholder="Enter category name"
                name="name"
                value={inputField.name}
                onChange={handleChange}
              />
            </div>
           
            <div className="">
              <h2 className="text-xl mb-4 font-semibold text-gray-700">
                Media And Published
              </h2>
              <div className="w-full mt-6 flex gap-5 ">
              
                <div className=" relative w-[150px] h-[150px] rounded-xl  flex justify-center hover:bg-green-100 transition-all duration-300 items-center border-dashed border-gray-400 border">
                  <input
                    type="file"
                    className="w-full h-[150px] absolute  z-20 cursor-default opacity-0 outline-none "
                    id="inputFile"
                    name="images"
                  
                    
                    onChange={hanldeFileChanges}
                  />
                  <div className=" absolute flex flex-col justify-center items-center   cursor-default ">
                    {selectedImage ? (
                      <div className="relative ">
                        <img
                          src={selectedImage}
                          alt="Preview"
                          className="w-[150px] rounded-xl h-[150px] object-cover opacity-100"
                        />
                        <span className="absolute -top-1 -right-1  z-20 bg-red-700 rounded-full">
                          <IoCloseSharp
                            onClick={handleRemoveImage}
                            className="text-xl text-white cursor-pointer"
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="opacity-35 flex justify-center items-center flex-col">
                        <span>
                          <FaRegImages className="text-[50px]" />
                        </span>
                        <h3 className="font-semibold">Image upload</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-xl mb-4 font-semibold text-gray-700">
                Banner 
              </h2>
              <div className="w-full mt-6 flex gap-5 ">
              
                <div className=" relative w-full max-w-[350px] h-[200px] rounded-xl  flex justify-center hover:bg-green-100 transition-all duration-300 items-center border-dashed border-gray-400 border">
                  <input
                    type="file"
                    className="w-full h-[150px] absolute  z-20 cursor-default opacity-0 outline-none "
                    id="inputBanner"
                    name="banner"
                  
                    
                    onChange={hanldeBannerChanges}
                  />
                  <div className=" absolute flex flex-col justify-center items-center   cursor-default ">
                    {selectedBanner ? (
                      <div className="relative w-full max-w-[350px] h-[200px]">
                        <img
                          src={selectedBanner}
                          alt="Preview"
                          className="w-full h-full rounded-xl  opacity-100"
                        />
                        <span className="absolute -top-1 -right-1  z-20 bg-red-700 rounded-full">
                          <IoCloseSharp
                            onClick={handleRemoveBanner}
                            className="text-xl text-white cursor-pointer"
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="opacity-35 flex justify-center items-center flex-col">
                        <span>
                          <FaRegImages className="text-[50px]" />
                        </span>
                        <h3 className="font-semibold">Banner upload</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
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
  );
};

export default AddCategory;
