import CircularProgress from "@mui/material/CircularProgress";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import axios from 'axios'
import { IoHome } from "react-icons/io5";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../App";
import {  useNavigate } from "react-router-dom";
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

const HomeBanner = () => {
    const [selectedBanner, setSelectedBanner] = useState(null);
    let navigate = useNavigate()
    let context = useContext(MyContext)
          let [isLoading,setIsLoading] = useState(false)
    
    const [open, setOpen] = useState({open:false,message:'',severity:''});
let [inputField,setInputField] = useState({
    imageUrl:''
})
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
    let handleBannerChange = (e) => {
        if (e.target.files.length > 0) {
          let file = e.target.files[0]
          let allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp','avif']
          let fileFormat = file.name.split('.').pop().toLowerCase()
          if(allowedFormat.includes(fileFormat)){
            handleBanner(e);
          
            handleChange({
              target: {
                name: "imageUrl",
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
    const handleRemoveBanner = () => {
      setSelectedBanner(null);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
      let handleChange = (e) => {
        setInputField(() => ({
          ...inputField,
          [e.target.name]: e.target.value,
        }));
      };
      
    
      let uploadBanner  = async (e) => {
        e.preventDefault()
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
                let result = await axios.post(`${BASE_URL}/banner/upload`,inputField, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
               console.log(result)
              setIsLoading(false)
              setOpen({open:true,message:result?.data?.message,severity:'success'})
              context.setProgress(100)
              setTimeout(() => {
                navigate('/admin/bannerList')
              }, 1000);

         
            } catch (error) {
                console.log(error);
              setIsLoading(false)
              setOpen({open:true,message:error.response.data.message,severity:'error'})
              context.setProgress(100)

            }
        };
  
  return (
       <div className=" p-3">
         <div className="w-full flex justify-between p-5 rounded-lg bg-white">
              <div>
                <h3 className="text-xl font-semibold">Banner Upload</h3>
              </div>
              <div role="presentation" className="">
                <Breadcrumbs aria-label="breadcrumb">
                  <StyledBreadcrumb
                    sx={{ cursor: "default" }}
                    component="a"
                    href="#"
                    icon={<IoHome className="text-lg text-inherit"/>}
                    label="Dashboard"
                  />
        
                  <StyledBreadcrumb sx={{ cursor: "default" }} label="Banner Upload" />
                  
                </Breadcrumbs>
              </div>
            </div>
          <form onSubmit={uploadBanner}  encType="multipart/form-data">
          <div className="bg-white mt-5 p-4 rounded-lg">
            <h2 className="text-xl mb-4 font-semibold text-gray-700">
                              Banner Image
                            </h2>
                            <div className="w-full mt-6 flex gap-5 ">
                            
                              <div className=" relative w-full max-w-[450px] h-[200px] rounded-xl  flex justify-center hover:bg-green-100 transition-all duration-300 items-center border-dashed border-gray-400 border">
                                <input
                                  type="file"
                                  className="w-full h-[150px] absolute  z-20 cursor-default opacity-0 outline-none "
                                  id="inputBanner"
                                  name="banner"
                                
                                  
                                  onChange={handleBannerChange}
                                />
                                <div className=" absolute flex flex-col justify-center items-center   cursor-default ">
                                  {selectedBanner ? (
                                    <div className="relative w-full max-w-[450px] h-[200px]">
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
                             <div className="w-full bg-green-500 rounded-md hover:bg-green-600 mt-4 transition-all duration-300">
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

export default HomeBanner