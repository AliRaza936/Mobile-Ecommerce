
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { forgot, reset } from "../store/feature/auth/authSlice";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); 
  // Step 1: Enter Email, Step 2: Reset Password
  let [loading,setLoading] = useState(false)
  
  const [error, setError] = useState("");
  let [formField,setFormField] = useState({
    email:'',
    password:'',
    confirmPassword:'',
    otpCode:""
  })
  let navigate = useNavigate()
let dispatch  = useDispatch()

let handleChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value
    })
  }

let context = useContext(MyContext)
  const handleRequestOTP = (e) => {
    e.preventDefault();
    // Call API to send OTP to email
      const payload = {
    email: formField.email.trim(),
  };

setLoading(true)
         dispatch(forgot(payload))
         .unwrap()
         .then((response) => {
          
       
           if (response?.success === true) {
       
             context?.setOpen?.({ open: true, message: response.message, severity: "success" });
setLoading(false)
            
             setStep(2);
           } else {
            setLoading(false)

             context?.setOpen?.({ open: true, message: response?.message, severity: "error" });
    
           }
         })
         .catch((error) => {
setLoading(false)
         
           context?.setOpen?.({ open: true, message: error, severity: "error" });
          
         });
    
  };

 const handleResetPassword = (e) => {
  e.preventDefault();
  setError("");

  const trimmedOtp = formField.otpCode.trim();
  const trimmedPassword = formField.password.trim();
  const trimmedConfirmPassword = formField.confirmPassword.trim();

  if (trimmedOtp.length !== 6) {
    setError("OTP must be exactly 6 digits.");
    return;
  }

  if (trimmedPassword === '') {
    context?.setOpen?.({ open: true, message: "Password cannot be blank!", severity: "error" });
    return;
  }

  if (trimmedConfirmPassword === '') {
    context?.setOpen?.({ open: true, message: "Confirm password cannot be blank!", severity: "error" });
    return;
  }

  if (trimmedPassword !== trimmedConfirmPassword) {
    context?.setOpen?.({ open: true, message: "Both passwords do not match", severity: "error" });
    return;
  }

  const payload = {
    email: formField.email.trim(),
    otpCode: trimmedOtp,
    password: trimmedPassword,
    confirmPassword: trimmedConfirmPassword,
  };

  dispatch(reset(payload))
    .unwrap()
    .then((response) => {
      if (response?.success === true) {
        context?.setOpen?.({ open: true, message: response.message, severity: "success" });
        navigate("/login");
      } else {
        context?.setOpen?.({ open: true, message: response?.message, severity: "error" });
      }
    })
    .catch((error) => {
      context?.setOpen?.({ open: true, message: error, severity: "error" });
    });
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {step === 1 ? (
          <form onSubmit={handleRequestOTP}>
            <label className="block mb-2 text-gray-600">Enter your email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Email Address"
              value={formField.email}
              name="email"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              {loading ? 'Sending...':'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <label className="block mb-2 text-gray-600">Enter OTP</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="6-digit OTP"
              value={formField.otpCode}
              name="otpCode"
              onChange={handleChange}
            
            />

            <label className="block mb-2 text-gray-600">New Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="New Password"
              name="password"
              value={formField.password ||''}
              onChange={handleChange}
            
            />

            <label className="block mb-2 text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formField.confirmPassword}
              onChange={handleChange}
           
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
