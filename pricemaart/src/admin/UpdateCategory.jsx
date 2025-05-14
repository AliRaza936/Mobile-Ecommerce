import CircularProgress from "@mui/material/CircularProgress";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { FaRegImages } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
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

const UpdateCategory = () => {
  let context = useContext(MyContext)
    let navigate = useNavigate()
 
    
    const [open, setOpen] = React.useState({open:false,message:'',severity:''});
    let {id}  =  useParams()
     let [inputField, setInputField] = useState({
        name: "",
       
        banner: "",
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
      let handleSubmit = async (e) => {
        e.preventDefault();
      console.log(inputField)
        if(inputField.name ==''  || selectedImage == null  || selectedBanner == null){
        
          setOpen({open:true,message:'Please fill all fields',severity:'error'})
    
          
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
          let result = await axios.put(
            `${BASE_URL}/category/update/${id}`,
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
          context.setProgress(100)
          setTimeout(() => {
            navigate("/admin/category")
          }, 1000);
     
          
        } catch (error) {
          console.log(error);
        setOpen({open:true,message:error.response.data.message,severity:'error'})
        context.setProgress(100)

          setIsLoading(false)
    
        }
        
      } ;



      let getSingleCategory = async (id)=>{
           try {
      let result = await axios.get(
        `${BASE_URL}/category/single/${id}`,
      
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
     


      setInputField(result.data.category)
      if (result.data.category.images && result.data.category.images.length > 0) {
        setSelectedImage(result.data.category.images[0]); 
    }
      if (result.data.category.banner) {
        setSelectedBanner(result.data.category.banner); 
    }
    
      
    } catch (error) {
      console.log(error);
      setIsLoading(false)

    }
      }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      useEffect(()=>{
            getSingleCategory(id)
      },[id])
  return (
    <div className="p-4 ">
   <div className="w-full flex flex-col sm:flex-row justify-between gap-2 p-5 rounded-lg bg-white">
  <div>
    <h3 className=" sm:text-xl text-lg font-semibold">Edit Category</h3>
  </div>
  <div role="presentation" className="flex flex-wrap gap-2 items-center">
    <Breadcrumbs aria-label="breadcrumb" className="text-base sm:text-base ">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        icon={<IoHome className="text-lg text-inherit" />}
        label="Dashboard"
      />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Category" />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Edit Category" />
    </Breadcrumbs>
  </div>
</div>


    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="mt-5 md:w-[70%] xs:w-[full] rounded-lg overflow-hidden">
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
              {/* <div className='relative'>
          <div className='  w-[150px] h-[150px] rounded-xl  flex justify-center items-center border-dashed border-gray-400 border'>
              <img className='object-cover w-[150px] h-[150px] rounded-xl' src={selectedImage} alt="" />
              <span className='absolute -top-1 -right-1  z-20 bg-red-700 rounded-full'><IoCloseSharp onClick={handleRemoveImage} className='text-xl text-white cursor-pointer'/></span>
          </div>
      </div> */}
              <div className=" relative w-[150px] h-[150px] rounded-xl  flex justify-center hover:bg-green-100 transition-all duration-300 items-center border-dashed border-gray-400 border">
                <input
                  type="file"
                  className="w-full h-[150px] absolute  z-20 cursor-default opacity-0 outline-none "
                  id="inputFile"
                  name="images"
                //  required={selectedImage === null} 
                  
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
  )
}

export default UpdateCategory