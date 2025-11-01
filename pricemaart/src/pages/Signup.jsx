import { CircularProgress, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FaShop } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import gooleImage from '/goooooogle.png';
import { useState, useContext } from "react";
import { MyContext } from "../App";
import logo from '/logo.png';
import { useDispatch } from "react-redux";
import { register, withGoogle } from "../store/feature/auth/authSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase';

const googleProvider = new GoogleAuthProvider();

const SignUp = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formField, setFormField] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const signInWithGoogle = () => {
    const auth = getAuth(app);
    setIsLoading(true)
    signInWithPopup(auth, googleProvider).then((result) => {
      const user = result.user;
      const fields = {
        name: user.displayName ?? "",
        email: user.email ?? "",
        verified: true,
        password: "",
        phone: user.providerData[0].phoneNumber == null ? "" : user.providerData[0].phoneNumber,
      };

      dispatch(withGoogle(fields))
        .unwrap()
        .then((response) => {
          if (response?.success === true) {
            context.setOpen({ open: true, message: response?.message, severity: "success" });
            setIsLoading(false);
            setTimeout(() => navigate("/"), 1500);
          } else {
            context.setOpen({ open: true, message: response?.message, severity: "error" });
            setIsLoading(false);
          }
        })
        .catch((error) => {
          context.setOpen({ open: true, message: error, severity: "error" });
          setIsLoading(false);
        });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (formField.name.trim() === "") {
      context.setOpen({ open: true, message: "Name cannot be blank!", severity: "error" });
      return;
    }
    if (formField.email.trim() === "") {
      context.setOpen({ open: true, message: "Email cannot be blank!", severity: "error" });
      return;
    }
    if (formField.password.trim() === "") {
      context.setOpen({ open: true, message: "Password cannot be blank!", severity: "error" });
      return;
    }
    if (formField.password.length < 6) {
      context.setOpen({ open: true, message: "Password must be at least 6 characters long!", severity: "error" });
      return;
    }
    if (formField.confirmPassword.trim() === "") {
      context.setOpen({ open: true, message: "Confirm password cannot be blank!", severity: "error" });
      return;
    }
    if (formField.password !== formField.confirmPassword) {
      context.setOpen({ open: true, message: "Passwords do not match!", severity: "error" });
      return;
    }

    // Registration logic
    setIsLoading(true);
    const userData = {
      name: formField.name,
      email: formField.email,
      password: formField.password,
    };

    dispatch(register(formField))
      .unwrap()
      .then((response) => {
        if (response?.success === true) {
          localStorage.setItem("signupData", JSON.stringify(userData));
          localStorage.setItem("email", formField.email);
          context.setOpen({ open: true, message: response.message, severity: "success" });
          setIsLoading(false);
          navigate('/login')
        } else {
          context.setOpen({ open: true, message: response?.message, severity: "error" });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        context.setOpen({ open: true, message: error, severity: "error" });
        setIsLoading(false);
      });
  };

  return (
    <div className="bg-white">
      <div className="w-full flex justify-center items-center h-screen bg-secondary rounded-bl-full">
        <div className="lg:w-[500px] xs:w-[300px] sm:w-[300px] md:w-[400px] rounded-xl shadow shadow-gray-400 bg-white py-2 px-10">
          <Link to={"/"} className="">
            <div className="w-[80px] mx-auto">
              <img src={logo} alt="" className="scale-[1.2]" />
            </div>
          </Link>
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-semibold mb-1">Sign Up</h2>
            <div className="flex flex-col gap-5">
              <TextField className="w-full" label="Name" name="name" onChange={inputChange} variant="standard" />
              <TextField className="w-full" label="Email" name="email" onChange={inputChange} variant="standard" />

              {/* Password Field */}
              <TextField
                className="w-full"
                label="Password"
                name="password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                onChange={inputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password Field */}
              <TextField
                className="w-full"
                label="Confirm Password"
                name="confirmPassword"
                variant="standard"
                type={showConfirmPassword ? "text" : "password"}
                onChange={inputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-primary p-1 w-1/2 items-center hover:bg-secondary text-white text-[16px] font-semibold rounded"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center">
                    <CircularProgress color="inherit" className="loader" />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
              <Link to="/" className="w-1/2">
                <button className="border w-full border-gray-500 p-1 hover:bg-green-100 rounded">Cancel</button>
              </Link>
            </div>

            <div className="flex gap-1 my-3 text-[15px] font-semibold">
              <h2>Already have an account?</h2>
              <Link to={"/login"} className="text-blue-700 hover:text-black group">
                <p>Sign In</p>
                <hr className="w-0 group-hover:w-[50px] transition-all duration-300 border-t border-black" />
              </Link>
            </div>
          </form>

          <div className="font-semibold text-gray-800 text-center flex flex-col items-center">
            <p>Or continue with social account</p>
            <button
              onClick={signInWithGoogle}
              className="flex items-center my-2 rounded border w-full justify-center py-1 border-gray-400 hover:bg-green-100"
            >
              <img width={35} src={gooleImage} alt="googleLogo" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
