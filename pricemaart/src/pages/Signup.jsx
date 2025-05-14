import {  CircularProgress, TextField } from "@mui/material"
import { FaShop } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"
import gooleImage from '/goooooogle.png'
import { useState } from "react"
import { useContext } from "react"
import { MyContext } from "../App"
import axios from "axios"
import logo from '/logo.png'
import { useDispatch } from "react-redux"
import { register, withGoogle } from "../store/feature/auth/authSlice"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {app} from '../firebase'

const googleProvider = new GoogleAuthProvider()
const SignUp = () => {
  let context = useContext(MyContext)
  let [isLoading,setIsLoading] = useState(false)

let navigate = useNavigate()
let dispatch = useDispatch()

  let [formField,setFormField] = useState({
    name:'',

    email:'',
    password:"",
    confirmPassword:"",
    
})

let inputChange = (e)=>{
  setFormField({
      ...formField,
      [e.target.name] : e.target.value
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
        
            if (response?.success === true) {
              context.setOpen({ open: true, message: response?.message, severity: "success" });
             
              setIsLoading(false);
              setTimeout(() => {
                navigate("/");
              }, 1500);
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



 let handleSubmit = async (e)=>{
  e.preventDefault()

if(formField.name =='' ){

context.setOpen({open:true,message:'name cannot be blank!',severity:'error'})

return
}


if(formField.email =='' ){

context.setOpen({open:true,message:'email cannot be blank!',severity:'error'})

return
}

if(formField.password =='' ){

context.setOpen({open:true,message:'password cannot be blank!',severity:'error'})

return
}
if(formField.confirmPassword =='' ){

context.setOpen({open:true,message:'confirm password cannot be blank!',severity:'error'})

return
}
if(formField.password != formField.confirmPassword ){

context.setOpen({open:true,message:'Both password not match',severity:'error'})

return
}

const userData = {
  name: formField.name,
  email: formField.email,
  password: formField.password,
};


  // try {
  //     let result = await axios.post(
  //       "http://localhost:5000/user/signup",
  //       formField,
  //       {
  //         withCredentials: true,
  //         headers: {

  //           "Content-Type": "application/json",
  //         },
  //       }

  //     );
  //     console.log(result)
  //     setIsLoading(false)
  //     context.setOpen({open:true,message:result?.data?.message,severity:'success'})
  //     setTimeout(() => {
  
  //       navigate("/signin")
       
  //     }, 1000);
      
     

      
  //   } catch (error) {
      
      

      setIsLoading(true)
        
   
  
      dispatch(register(formField))
      .unwrap()
      .then((response) => {
        console.log(response);
    
        if (response?.success === true) {
          localStorage.setItem("signupData", JSON.stringify(userData));
          localStorage.setItem("email", formField.email);
          
          context.setOpen({ open: true, message: response.message, severity: "success" });
          console.log("Navigating to /verify");
          setIsLoading(false);
          navigate("/verify");
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
    <>
    <div className="bg-white">
      <div className="w-full flex justify-center  items-center h-screen bg-secondary rounded-bl-full  ">
           <div className="lg:w-[500px] xs:w-[300px] sm:w-[300px] md:w-[400px]  rounded-xl  shadow shadow-gray-400 bg-white py-2 px-10">
           <Link to={'/'} className="">
                  <div className="w-[80px] mx-auto "> 
                    <img src={logo} alt="" className=" scale-[1.2] mt-" />
                  </div>
               </Link>
               <form onSubmit={handleSubmit}>
                <div className="">
             <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
               <div className="flex flex-col gap-5">
                       <div className="flex gap-5">
                       <TextField  className="w-full" label="Name" name="name" onChange={inputChange} variant="standard" />
                    
                       </div>
                       <div>
                       <TextField  className="w-full" name="email" onChange={inputChange} label="Email" variant="standard" />
                       </div>
                       <div>
                       <TextField  className="w-full" name="password" onChange={inputChange} label="Password" variant="standard" />
                       </div>
                       <div>
                       <TextField  className="w-full" name="confirmPassword" onChange={inputChange} label="Confirm Password" variant="standard" />
                       </div>
                       
                       {/* <div>
                       <Link className="text-blue-700 group hover:text-black inline-block"><p className="font-semibold text-[14px] mt-3 ">Forget Password?</p>
                      <hr className="w-0 border-t border-black mt-1  group-hover:w-[110px] transition-all duration-300 " />
                       </Link>
                       </div> */}
               </div>
               <div className="flex gap-4 mt-6">
                   <button type="submit" className="bg-primary p-1 w-1/2   r items-center hover:bg-secondary text-white text-[16px] font-semibold rounded" disabled={isLoading}>{
                    isLoading == true ? <div className="flex justify-center"><CircularProgress color="inherit " className="loader" /></div> :
                'Sign Up'
                   }
                 </button>
                   <Link to='/'className="w-1/2"><button  className="border w-full  border-gray-500 p-1  hover:bg-green-100 rounded">Cancel</button></Link>
               </div>
               <div className="flex gap-1 my-3 text-[15px] font-semibold">
                   <h2 className="">Already have account?</h2>
                   <Link to={'/login'} className="text-blue-700 hover:text-black group"><p>Sign In</p>
                   <hr className="w-0 group-hover:w-[50px] transition-all duration-300 border-t border-black"/></Link>
               </div>
              
             </div>
               </form>
               <div className="font-semibold text-gray-800 text-center flex flex-col items-center">
                   <p>
                       Or continue with social account 
                   </p>
               <button onClick={signInWithGoogle} className="flex items-center my-2 rounded border w-full justify-center py-1 border-gray-400 hover:bg-green-100"><img width={35} src={gooleImage} alt="googleLogo" /> 
                   Sign in with Google</button>
               </div>
             
           </div>
    </div>
    </div>
    
       </>
  )
}

export default SignUp