import { useState, useRef, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, verify } from "../store/feature/auth/authSlice";
import { MyContext } from "../App";

export default function VarifyEmail() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  let [loading,setLoading] = useState(false)
    let [formField,setFormField] = useState({
        email:'',
        optCode:''
    })
    let context = useContext(MyContext)

  const inputRefs = useRef([]);
let dispatch = useDispatch()
let navigate = useNavigate()
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(""); // Clear error on change

      // Move to next input if a digit is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear current input
      setOtp(newOtp);

      // Move to previous input
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = () => {
    setLoading(true)
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);

    if (enteredOtp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    const verificationData = {
        email: formField.email.trim(),  // Ensure email is correctly set
        otpCode: enteredOtp,
      };
    

      dispatch(verify(verificationData))
          .unwrap()
          .then((response) => {
            console.log(response)
            if (response?.success == true) {
         
          
                
                localStorage.removeItem('signupData')
                localStorage.removeItem('email')
                context.setOpen({open:true,message:response.message,severity:'success'})
            setTimeout(() => {
                setLoading(false)
                navigate('/login')
            }, 1500);
             
            } else {
              context.setOpen({open:true,message:response?.message,severity:'error'})
                setLoading(false)

            }
          })
          .catch((error) => {
            console.log(error)
            context.setOpen({open:true,message:error,severity:'error'})
            setLoading(false)

          });
          
    
    

  };
let [email,setEmail] = useState('')
 
  const handleResend = () => {
    console.log("Resending OTP...");
    setResendTimer(30);
    setError(""); // Clear any previous error
    // Call API to resend OTP here
    const storedData = JSON.parse(localStorage.getItem("signupData"));
 

    if (!storedData) {
      setError("No signup data found. Please sign up again.");
      return;
    }
    
            dispatch(register(storedData))
          .unwrap()
          .then((response) => {
            console.log(response)
            if (response?.success == true) {
         
               
              context.setOpen({open:true,message:'OTP resent successfully',severity:'success'})
            
             
            } else {
              context.setOpen({open:true,message:response?.message,severity:'error'})
    
            }
          })
          .catch((error) => {
            console.log(error)
            context.setOpen({open:true,message:error,severity:'error'})
    
          });
  };
  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormField(parsedData);
    }
  }, []);
  useEffect(()=>{
    let saveEmail = localStorage.getItem('email')
    setEmail(saveEmail)
  },[])
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 py-10 rounded-lg shadow-md text-center w-[400px]">
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="my-2 font-medium text-gray-800">{email}</p>
        <p className="text-gray-600 mb-4">Enter the 6-digit OTP sent to your email</p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              className="w-12 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-secondary transition w-full"
        >
          {loading === false ? 'Verify OTP':'Verifying...'}
        </button>

        <div className="mt-4">
          {resendTimer > 0 ? (
            <p className="text-gray-500 text-sm">Resend OTP in {resendTimer}s</p>
          ) : (
            <button onClick={handleResend} className="text-blue-600 text-sm font-semibold hover:underline">
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
