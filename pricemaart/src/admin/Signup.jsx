// import React, { useState } from 'react'

import { useContext, useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "../App";
import { Button } from "@mui/material";
import { FaShop } from "react-icons/fa6";
import googleImage from "/goooooogle.png"
import { MdEmail } from "react-icons/md";
import { IoMdEyeOff, IoMdLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { IoShieldHalfOutline } from "react-icons/io5";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
const Signup = () => {
    let context = useContext(MyContext)
    let [isShowConfirmPassowrd,setIsShowConfirmPassowrd] = useState(false)
    let [isShowPassowrd,setIsShowPassowrd] = useState(false)
          const [open, setOpen] =useState({open:false,message:'',severity:''});
  let [isLoading,setIsLoading] = useState(false)
let navigate = useNavigate()
let [formField,setFormField] = useState({
    name:'',
    phone:"",
    email:'',
    password:"",
    confirmPassword:"",
    isAdmin:true,
})
   let inputChange = (e)=>{
    setFormField({
        ...formField,
        [e.target.name] : e.target.value
    })
   }
   const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };
    useEffect(()=>{
            context.setIshideHeaderSideBar(true)
    },[context])
    
        let [focusIndex,setFocusIndex] = useState(null)
        let focusInput = (index) =>{
            setFocusIndex(index)
        }


        let ShowPasword = ()=>{
            setIsShowPassowrd(!isShowPassowrd)
        }
        let ShowConfirmPasword = ()=>{
            setIsShowConfirmPassowrd(!isShowConfirmPassowrd)
        }


        let handleSubmit = async (e)=>{
            e.preventDefault()
            
    if(formField.name =='' ){
        
        setOpen({open:true,message:'name cannot be blank!',severity:'error'})

        return
      }
    if(formField.email =='' ){
        
        setOpen({open:true,message:'email cannot be blank!',severity:'error'})

        return
      }
    if(formField.phone =='' || formField.phone == null ){
        
        setOpen({open:true,message:'phone no cannot be blank!',severity:'error'})

        return
      }
    if(formField.password =='' ){
        
        setOpen({open:true,message:'password cannot be blank!',severity:'error'})

        return
      }
    if(formField.confirmPassword =='' ){
        
        setOpen({open:true,message:'confirm password cannot be blank!',severity:'error'})

        return
      }
    if(formField.password !== formField.confirmPassword ){
        
        setOpen({open:true,message:'both passowrd are not match',severity:'error'})

        return
      }
      
            try {
                let result = await axios.post(
                  "http://localhost:5000/user/signup",
                  formField,
                  {
                    withCredentials: true,
                    headers: {

                      "Content-Type": "application/json",
                    },
                  }

                );
                console.log(result)
                setIsLoading(false)
                setOpen({open:true,message:result?.data?.message,severity:'success'})
                setTimeout(() => {
                  context.setProgress(100)
                  navigate("/login")
                 
                }, 1000);
                
               
          
                
              } catch (error) {
                
                context.setProgress(100)
          
                setIsLoading(false)
                  
                  setOpen({open:true,message:error.response.data.message,severity:'error'})
            
                  
                
          
          
              }
        }
  return (
<div className="flex   ">
        <div className="w-full flex justify-center  my-auto h-[50vh]">
           <div className="w-[80%]">
            <h2 className="text-[50px] font-bold">Best UX/UI FASHION</h2>
            <h3 className="text-[50px] leading-[55px] font-bold text-green-500">ECOMMERCE DASHBOARD <span className="text-black">&</span> <p className="text-black">ADMION PANEL</p></h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus quidem maiores ipsam, facilis et blanditiis commodi quam quos iusto! Consequatur consequuntur iusto aut magnam possimus. Vel saepe tempore suscipit dolorem harum, excepturi temporibus nostrum magni, voluptas tenetur beatae est veritatis, reiciendis illum enim assumenda ex nemo dicta quos! Deleniti, corporis?</p>
           <Link to={'/'}> <button className="p-2 bg-green-600 text-lg font-semibold text-white mt-4 rounded-md">Go To Home</button></Link>
           </div>
        </div>

<div>
        <div className=" w-[450px] px-4 sca  pt-4 pb-3 bg-green-100 rounded-lg">
             <div className="flex flex-col items-center">
                          <h1 className="text-2xl flex  items-center font-semibold">
                            <p className="text-4xl text-green-700 me-2">
                              <FaShop />
                            </p>
                           Online <span className="text-green-600">Shop</span>
                          </h1>

                        </div>
                         
<form onSubmit={handleSubmit}>
     <div className="flex flex-col gap-4 px-2 items-center mt-3">
                            <div className={ `${focusIndex === 0 &&'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
                                <span><FaUserCircle className=" text-2xl absolute top-[8px] left-[10px]"/></span>
                                <input type="text" onFocus={()=>focusInput(0)} onBlur={()=>setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md flex-grow outline-none " placeholder="Enter your name" name="name" onChange={inputChange}/>
                            </div>
                            <div className={ `${focusIndex === 1 &&'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
                                <span><MdEmail className=" text-2xl absolute top-[8px] left-[10px]"/></span>
                                <input type="email" onFocus={()=>focusInput(1)} onBlur={()=>setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md flex-grow outline-none " placeholder="Enter your email" name="email" onChange={inputChange}/>
                            </div>
                            <div className={ `${focusIndex === 2 &&'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
                                <span><FaPhoneAlt className=" text-2xl absolute top-[8px] left-[10px]"/></span>
                                <input type="number" onFocus={()=>focusInput(2)} onBlur={()=>setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md flex-grow outline-none " placeholder="Enter your phone no" name="phone" onChange={inputChange}/>
                            </div>
                            <div className={ `${focusIndex === 3 &&'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
                                <span><IoMdLock className=" text-2xl absolute top-[8px] left-[10px]"/></span>
                                <input type={`${isShowPassowrd===true ?"text":'password'}`} onFocus={()=>focusInput(3)} onBlur={()=>setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md  flex-grow outline-none " placeholder="Enter your password" name="password" onChange={inputChange}/>
                                <span onClick={ShowPasword} className="absolute text-gray-600 right-2 text-xl cursor-pointer">{isShowPassowrd === true ?<IoEye/>:<IoMdEyeOff/>}</span>
                            </div>
                            <div className={ `${focusIndex === 4 &&'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
                                <span><IoShieldHalfOutline className=" text-2xl absolute top-[8px] left-[10px]"/></span>
                                <input type={`${isShowPassowrd===true ?"text":'password'}`} onFocus={()=>focusInput(4)} onBlur={()=>setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md  flex-grow outline-none " placeholder="Confirm your password" name="confirmPassword" onChange={inputChange}/>
                                <span onClick={ShowConfirmPasword} className="absolute text-gray-600 right-2 text-xl cursor-pointer">{isShowConfirmPassowrd === true ?<IoEye/>:<IoMdEyeOff/>}</span>
                            </div>
                          
                            <div className="w-full bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300">
              <Button type="submit" className="w-full flex gap-3">
                {" "}
                <span className="text-white text-3xl">
                  <FaCloudUploadAlt />
                </span>{" "}
                
                <p className="text-white flex items-center gap-2 text-lg font-semibold">
                    { isLoading === false ?"Sign up": <CircularProgress color="inherit " className="loader" />}
                  
                  
                </p>
              </Button>
            </div>
                          

                           <div className="flex w-full justify-center items-center">
                            <span className="w-[35%] h-[1px] block bg-gray-500"></span>
                            <span className="w-[40px] h-[40px] flex justify-center items-center text-lg border border-gray-500  rounded-full">OR</span>
                            <span className="w-[35%] h-[1px] block bg-gray-500"></span>

                           </div >
                      <div className="bg-white w-full rounded-md border border-green-400">
                      < Button  sx={{textTransform:'none'}} className="flex gap-3 bg-white w-full justify-center p-1">
                       <img src={googleImage} alt="" className="" width={35} />
                       <p className="text-green-600 text-lg">Sign up With Google</p>
                       </Button>
                      </div>
                      <div className="flex gap-1">
                        <p>Already have account</p>
                        <Link to={'/login'} className="font-semibold text-green-700 "><p className=" hover:border-b border-green-500">Log in</p></Link>
                      </div>
                        </div>
</form>
                       

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

export default Signup