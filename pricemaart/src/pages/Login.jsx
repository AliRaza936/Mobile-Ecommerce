import React from 'react'
import { FaShop } from "react-icons/fa6"
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from "react-router-dom";
import gooleImage from '/goooooogle.png'
import { useContext, useState } from "react";
import { MyContext } from "../App";
import axios from "axios";
import {  CircularProgress } from "@mui/material";
import logo from '/logo.png'
import { useDispatch } from 'react-redux';
import { login, withGoogle } from '../store/feature/auth/authSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {app} from '../firebase'
// const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const Login = () => {
    let context = useContext(MyContext)
    let dispatch =  useDispatch()
    let navigate = useNavigate()
  let [isLoading, setIsLoading] = useState(false)
  let [formField, setformField] = useState({
    email: '',
    password: '',

  })

  let handleChange = (e) => {
    setformField({
      ...formField,
      [e.target.name]: e.target.value
    })
  }


let signInWithGoogle = ()=>{
  const auth = getAuth(app);
signInWithPopup(auth, googleProvider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
   
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log(result)
    const fields  = {
        name: user.displayName ?? '', // directly from `user`, not `providerData`
        email: user.email ?? '',
      
   

        verified:true,
      password:'',
      phone: user.providerData[0].phoneNumber == null ? '' : user.providerData[0].phoneNumber

    }
    dispatch(withGoogle(fields))
          .unwrap()
          .then((response) => {
            
            console.log(response)
            let user  = response.user
        
            if (response?.success === true) {
              context.setOpen({ open: true, message: response?.message, severity: "success" });
             
              setIsLoading(false);
              setTimeout(() => {
                

                if(user.role == 'user'){
                  navigate("/");
                }else{
                  
      navigate('/admin/dashboard');

                }
              }, 1000);
            } else {
              context.setOpen({ open: true, message: response?.message, severity: "error" });
              setIsLoading(false);
            }
          })
          .catch((error) => {
          
            context.setOpen({ open: true, message: error, severity: "error" });
            setIsLoading(false);
          });
  })

}
  let handleSubmit = async (e) => {
    e.preventDefault()

    
    if (formField.email == '') {

      context.setOpen({ open: true, message: 'email cannot be blank!', severity: 'error' })

      return
    }

    if (formField.password == '') {

      context.setOpen({ open: true, message: 'password cannot be blank!', severity: 'error' })

      return
    }

    setIsLoading(true);

     dispatch(login(formField))
          .unwrap()
          .then((response) => {
            
          
        
            if (response?.success === true) {
              context.setOpen({ open: true, message: response?.message, severity: "success" });
             let user  = response.user
              setIsLoading(false);
              setTimeout(() => {
                

                if(user.role == 'user'){
                  navigate("/");
                }else{
                  
      navigate('/admin/dashboard');

                }
              }, 1000);
            } else {
              context.setOpen({ open: true, message: response?.message, severity: "error" });
              setIsLoading(false);
            }
          })
          .catch((error) => {
          
            context.setOpen({ open: true, message: error, severity: "error" });
            setIsLoading(false);
          });
    
  }
 
  return (
    <div className="w-full flex justify-center items-center h-[100vh] bg-secondary rounded-bl-full  ">
        <div className="lg:w-[500px] xs:w-[300px] sm:w-[300px] md:w-[400px]  rounded-xl bg-white shadow shadow-gray-500 py-3 px-10">
        <Link to={'/'} className="">
             <div className="w-[80px] mx-auto "> 
                                <img src={logo} alt="" className=" scale-[1.2] mt-" />
                              </div>
            </Link>
          <div className="">
          <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
          <form onSubmit={handleSubmit}>
              <div>
                    <div>
                    <TextField type='email' className="w-full" label="Email" variant="standard" name="email" onChange={handleChange}/>
                    </div>
                    <div className="mt-4">
                    <TextField  className="w-full" label="Password" variant="standard" name="password" onChange={handleChange} />
                    </div>
                    <div>
                    <Link to={'/forgot-password'}  className="text-blue-700 group hover:text-black inline-block"><p className="font-semibold text-[14px] mt-3 ">Forget Password?</p>
                   <hr className="w-0 border-t border-black mt-1  group-hover:w-[110px] transition-all duration-300 " />
                    </Link>
                    </div>
            </div>

            <div className="flex gap-4 mt-6">
                   <button type="submit" className="bg-primary p-1 w-1/2    items-center hover:bg-secondary text-white text-[16px] font-semibold rounded" disabled={isLoading}>{
                    isLoading == true ? <div className="flex justify-center"><CircularProgress color="inherit " className="loader" /></div> :
                'Sign In'
                   }
                 </button>
                   <Link to='/'className="w-1/2"><button  className="border w-full  border-gray-400 p-1  hover:bg-gray-100 rounded">Cancel</button></Link>
               </div>
          </form>
          
          
            <div className="flex gap-1 my-3 text-[15px] font-semibold">
                <h2 className="">Not Registered?</h2>
                <Link to={'/signup'} className="text-blue-700 hover:text-black group"><p>Sign Up</p>
                <hr className="w-0 group-hover:w-[55px] transition-all duration-300 border-t border-black"/></Link>
            </div>
            <div className="font-semibold text-gray-800 text-center flex flex-col items-center">
                <p>
                    Or continue with social account 
                </p>
            <button onClick={signInWithGoogle} className="flex items-center my-3 rounded border w-full justify-center py-1 border-gray-400 hover:bg-green-100"><img width={35} src={gooleImage} alt="googleLogo" /> 
                Sign in with Google</button>
            </div>
          </div>
        </div>
 </div>
  )
}

export default Login