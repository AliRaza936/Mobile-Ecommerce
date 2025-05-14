import { useContext, useEffect, useState } from "react"
import { MyContext } from "../App"
import { FaShop } from "react-icons/fa6"
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import googleImage from "/goooooogle.png"
import { Link, } from "react-router-dom";

import axios from "axios";






const Login = () => {
  let context = useContext(MyContext)
  const [open, setOpen] = useState({ open: false, message: '', severity: '' });
  let [isLoading, setIsLoading] = useState(false)
  let [formField, setformField] = useState({
    email: '',
    password: '',
    isAdmin: true,
  })
  let handleChange = (e) => {
    setformField({
      ...formField,
      [e.target.name]: e.target.value
    })
  }
  // let navigate = useNavigate()


  let [isShowPassowrd, setIsShowPassowrd] = useState(false)
  useEffect(() => {
    context.setIshideHeaderSideBar(true)

  }, [context])

  let [focusIndex, setFocusIndex] = useState(null)
  let focusInput = (index) => {
    setFocusIndex(index)
  }
  let ShowPasword = () => {
    setIsShowPassowrd(!isShowPassowrd)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  let handleSubmit = async (e) => {
    e.preventDefault()


    if (formField.email == '') {

      setOpen({ open: true, message: 'email cannot be blank!', severity: 'error' })

      return
    }

    if (formField.password == '') {

      setOpen({ open: true, message: 'password cannot be blank!', severity: 'error' })

      return
    }


    try {
      let result = await axios.post(
        "http://localhost:5000/user/signin  ",
        formField,
        {
          withCredentials: true,
          headers: {

            "Content-Type": "application/json",
          },
        }

      );
      let res = result?.data
      localStorage.setItem('token', res?.token)
      let user = {
        name: res?.user?.name,
        email: res?.user?.email,
        userId: res?.user._id

      }
      localStorage.setItem('user', JSON.stringify(user))

      console.log(result)
      setIsLoading(false)
      setOpen({ open: true, message: result?.data?.message, severity: 'success' })
      setTimeout(() => {
        context.setProgress(100)
        window.location.href = "/"
        // navigate("/")

      }, 1000);




    } catch (error) {

      context.setProgress(100)

      setIsLoading(false)

      setOpen({ open: true, message: error.response.data.message, severity: 'error' })





    }
  }

  return (
    <div className="flex justify-center mt-4  ">
      <div className=" w-[350px] px-4  py-5  bg-green-100 rounded-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl flex  items-center font-semibold">
            <p className="text-4xl text-green-700 me-2">
              <FaShop />
            </p>
            Online <span className="text-green-600">Shop</span>
          </h1>

        </div>
        <p className="text-2xl font-semibold px-2 my-5">Login Page</p>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 px-2 items-center mt-3">
            <div className={`${focusIndex === 0 && 'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
              <span><MdEmail className=" text-2xl absolute top-[8px] left-[10px]" /></span>
              <input type="email" onFocus={() => focusInput(0)} onBlur={() => setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md flex-grow outline-none " placeholder="Enter Your Email" name="email" onChange={handleChange} />
            </div>
            <div className={`${focusIndex === 1 && 'text-green-600'} text-gray-600  relative flex w-full bg-white  rounded-md  items-center`}>
              <span><IoMdLock className=" text-2xl absolute top-[8px] left-[10px]" /></span>
              <input type={`${isShowPassowrd === true ? "text" : 'password'}`} onFocus={() => focusInput(1)} onBlur={() => setFocusIndex(null)} className="p-2 focus:outline-green-600 focus:outline-1 text-gray-500 pl-10 rounded-md  flex-grow outline-none " placeholder="Enter Your Password" name="password" onChange={handleChange} />
              <span onClick={ShowPasword} className="absolute text-gray-600 right-2 text-xl cursor-pointer">{isShowPassowrd === true ? <IoEye /> : <IoMdEyeOff />}</span>
            </div>

            <div className="w-full bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300">
              <Button type="submit"  className="w-full flex gap-3">
                {" "}


                <p className="text-white flex items-center gap-2 text-lg font-semibold">
                  {isLoading === false ? "Sign in" : <CircularProgress color="inherit " className="loader" />}


                </p>
              </Button>
            </div>

          </div>
        </form>
        <div className="flex flex-col items-center mt-2 gap-2">

          <button className="font-semibold text-gray-700 hover:text-green-600">FORGOT PASSWORD ?</button>

          <div className="flex w-full justify-center items-center">
            <span className="w-[35%] h-[1px] block bg-gray-500"></span>
            <span className="w-[40px] h-[40px] flex justify-center items-center text-lg border border-gray-500  rounded-full">OR</span>
            <span className="w-[35%] h-[1px] block bg-gray-500"></span>

          </div >
          <div className="my-2 w-full px-3 flex justify-center ">
            <button className="flex items-center my-3 rounded border w-full justify-center border-green-400 font-semibold gap-2 py-1 hover:bg-green-100"><img width={35} src={googleImage} alt="googleLogo" /> 
                            Sign in with Google</button>
                       
          </div>
          <div className="flex gap-1">
            <p>Don{"'"}t have an account</p>
            <Link to={'/signup'} className="font-semibold text-green-700"><p className=" hover:border-b border-green-500">Register</p></Link>
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

export default Login