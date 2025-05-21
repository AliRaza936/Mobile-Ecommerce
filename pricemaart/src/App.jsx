import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import React, { createContext, useEffect, useState } from "react"

import ProductDetails from "./pages/ProductDetails"
import Navbar from "./components/navbar"
import Footer from "./components/Footer"
import LoadingBar from "react-top-loading-bar";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import { Alert, Snackbar } from "@mui/material"
import SignUp from "./pages/Signup"
import VarifyEmail from "./pages/VarifyEmail"
import Login from "./pages/Login"
import axios from "axios"
import ForgotPassword from "./pages/ForgotPassword"
import MyAccount from "./pages/MyAccount"
import OrdersPage from "./pages/OrdersPage"
import Wishlist from "./pages/Wishlist"
import BrandCollection from "./pages/BrandCollection"
import SearchPage from "./pages/SearchPage"
import AllProducts from "./pages/AllProducts"
import SaleOffer from "./pages/SaleOffer"
import AccessoryProductDetails from "./pages/AccessoryProductDetails"
import AllAccessoryProducts from "./pages/AllAccessoryProducts"
import SingleAccessorypage from "./pages/SingleAccesorypage"
import FeaturedProducts from "./pages/FeaturedProduct"
import Accessoryname from "./components/Accessoryname"
import BackToTop from "./components/BackToTop"
import BASE_URL from "../apiConfig"
import Dashboard from './admin/Dashboard'
import Header from "./adminComponent/Header";
import SideBar from "./adminComponent/SideBar";

import ProductList from "./admin/ProductList";
import AddProduct from "./admin/AddProduct";
import UpdateProduct from "./admin/UpdateProduct";
import AddCategory from "./admin/AddCategory";
import CategoryList from "./admin/CategoryList";
import UpdateCategory from "./admin/UpdateCategory";
import AddSubCat from "./admin/AddSubCat";
import SubcategoryList from "./admin/SubcategoryList";
import ProductRam from "./admin/ProductRam";
import ProductWeight from "./admin/ProductWeight";
import ProductSize from "./admin/ProductSize";
import HomeBanner from "./admin/HomeBanner";
import BannerList from "./admin/BannerList";
import UpdateBanner from "./admin/UpdateBanner";
import SaleBannerUpload from "./admin/SaleBannerUpload";
import SaleBannerList from "./admin/SaleBannerList";
import UpdateSaleBanner from "./admin/UpdateSaleBanner";
import AddAccessory from "./admin/AddAccessory";
import AccessoryList from "./admin/AccessoryList";
import UpdateAccessory from "./admin/UpdateAccessory";
import AddSubProduct from "./admin/AddSubProduct";
import UpdateAccessoryProduct from "./admin/UpdateAccessoryProduct";
import OrderList from "./admin/OrderList";
import AdminProductDetail from "./admin/AdminProductDetails";
import AdminAccessoryDetail from "./admin/AccessoryProductDetails";
import ProtectedAdminRoute from "./adminComponent/ProtectedAdminRoute"





let MyContext = createContext()
function App() {
  let location = useLocation()
  let navigate = useNavigate()
  let [userData, setUserData] = useState({})
  const [open, setOpen] = React.useState({ open: false, message: '', severity: '' });
  let [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  let [saleBanner, setSaleBanner] = useState([]);
  let [allCategories, setAllCategories] = useState({});




  let [accessory, setAccessory] = useState([])
  let isCheckout = location.pathname.startsWith('/checkout')
  let verifyEmail = location.pathname.startsWith('/verify')
  let forgot = location.pathname.startsWith('/forgot-password')
  let isAmdin = location.pathname.startsWith('/admin')
  let LoginSignup = location.pathname.startsWith('/signup') || location.pathname.startsWith('/login')
  let [role,setRole] = useState('admin')

  const [progress, setProgress] = useState(0);

  let [isToggleSideBar, setIsToggleSideBar] = useState(false)

  let [productLength, setProductLength] = useState(0)
  let [reviewLength, setreviewLength] = useState(0)
  let [userLength, setuserLength] = useState(0)
  let [orderLength, setorderLength] = useState(0)
  const [salesData, setSalesData] = useState([]);



  const [year, setYear] = useState(new Date().getFullYear());

  let [isHideHeaderSideBar, setIshideHeaderSideBar] = useState(false)

  let allReviewsLength = async () => {


    try {

      let result = await axios.get(`${BASE_URL}/review/all`, {

      }, {

        withCredentials: true,
        headers: {
          'Content-Type': "application/json"
        }
      })



      setreviewLength(result?.data?.reviews?.length)
    } catch (error) {
      console.log(error)
    }

  }
  const allOrdersLength = async () => {

    try {
      const result = await axios.get(`${BASE_URL}/orders/allOrders`);




      setorderLength(result?.data?.orderLists?.length)
    } catch (error) {
      console.error("Error fetching orders:", error);


    }
  };
  let allUserLength = async () => {

    try {
      let result = await axios.get(
        `${BASE_URL}/user/all`,

        {
          withCredentials: true,
          headers: {

            "Content-Type": "application/json",
          },
        }

      );

      setuserLength(result?.data?.users?.length)
    } catch (error) {

      console.log(error)
    }
  }

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUNE",
    "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  const fetchSalesData = async () => {
    try {
      let result = await axios.get(`${BASE_URL}/sales?year=${year}`,);

      const salesByMonth = result.data.salesData.reduce((acc, curr) => {
        acc[curr.month - 1] = { month: months[curr.month - 1], totalSales: curr.totalSales };
        return acc;
      }, new Array(12).fill(null).map((_, i) => ({ month: months[i], totalSales: 0 })));

      setSalesData(salesByMonth);
      console.log(salesByMonth)
    } catch (error) {

      console.error("Error updating status:", error);

    }
  };



  useEffect(() => {
    fetchSalesData(); // Default to current year
  }, [year]);

  
  const singleUserData = async () => {
  
    try {
      const userJSON = localStorage.getItem("user");
  
      if (!userJSON) {
        console.warn("No user found in localStorage.");
        setLoading(false);
        return;
      }
  
      const parsedUser = JSON.parse(userJSON);
      const userId = parsedUser?.userId;
  
      if (!userId) {
        console.warn("User ID not found in localStorage object.");
        setLoading(false);
        return;
      }
  
      const result = await axios.get(
        `${BASE_URL}/user/single/${userId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log('ndalfnl',result.data.user);
      setUserData(result?.data?.user);
  setRole(result?.data?.user?.role )
  console.log(result.data.user.role)
      // Check if the current pathname is for an admin route and if the user is an admin
      const currentPath = window.location.pathname;
      if (currentPath.startsWith('/admin') && result?.data?.user?.role !== 'admin' && result?.data?.user?.role !== 'testAdmin') {
        console.warn("Access denied. Redirecting to homepage.");
        // setMessage('You are not authorized to access this page.');
        setTimeout(() => {
          // setMessage('');
          navigate('/'); // Redirect to homepage
        }, 3000);
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      setRole("user")
        
    }
    } finally {
      setLoading(false);
    }
  };
  // let [message,setMess');
        setTimeout(() => {
          // setMessect to trigger on mount

  // if (message) {
  //   return (
    
  //       <div className="text-center">
  //         <p className="text-2xl">{message}</p>
          
  //       </div>
  
  //   );
  // }
  

  useEffect(() => {

    allReviewsLength()
    allOrdersLength()
    allUserLength()
singleUserData()

  }, [])


useEffect(()=>{
  if(isAmdin){
    singleUserData()
  }
},[isAmdin])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
// Dependency on path change

  const allSaleBanner = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/saleBanner/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const banners = result?.data?.banners || [];
      const imageUrls = banners.map((img) => img?.imageUrl);
      setSaleBanner(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };
  let allCategory = async () => {


    try {
      let result = await axios.get(`${BASE_URL}/category/all`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setAllCategories(result.data)
      setAllCategories(result.data)



    } catch (error) {
      console.log(error)



    }
  }
  const allAccessory = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/accessory/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result)
      setAccessory(result?.data?.accessories)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    const checkLoginStatus = () => {
      const tokenData = JSON.parse(localStorage.getItem("authToken"));
      const userData = JSON.parse(localStorage.getItem("user"));
  
      if (tokenData && userData) {
        const { token, expiresAt } = tokenData;
  
        const now = new Date().getTime();
  
        // Check if token is still valid
        if (token && expiresAt && expiresAt > now) {
          setIsLogin(true);
          return;
        }
      }
  
      // If any check fails
      setIsLogin(false);
    };
    checkLoginStatus();
  }, [location.pathname]); 
  useEffect(() => {
    allSaleBanner();
    allAccessory();
    allCategory();
  }, []);
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-200 bg-opacity-20">
        <div className="spinner rounded-full w-16 h-16 border-4 border-t-blue-500 border-transparent"></div>
      </div>

    );
  }
  let values = {
    setOpen,
    open,
    setIsLogin,
    isLogin,
    userData,
    setUserData,
    setSaleBanner,
    saleBanner,
    setAccessory,
    accessory,
    setAllCategories,
    allCategories, setIsOpenPopup,
    isOpenPopup,
    isToggleSideBar,
    setIsToggleSideBar,

    isHideHeaderSideBar,
    setIshideHeaderSideBar,
    setProgress,

    salesData,
    setSalesData,

    setYear,
    year,
    setProductLength,
    productLength,
    setreviewLength,
    reviewLength,
    setuserLength,
    userLength,
    orderLength,
    setorderLength,
    setRole,
    role
 
  }
  return (
    <>



      <MyContext.Provider value={values}>
        <BackToTop />
        {
          loading ? null : (
            !isAmdin &&  !LoginSignup && !verifyEmail && !forgot && <Navbar />
          )
        }
        {
          loading ? null : (
            !isAmdin &&  !LoginSignup && !verifyEmail && !forgot && <Accessoryname />
          )
        }
       {
  isAmdin && (
    <div className=""  style={{ backgroundColor: 'rgb(194, 245, 194)' }}>
      <LoadingBar
        color='#3dd40f'
        className='topLoadingBar'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
      {isHideHeaderSideBar === true || (role !== 'admin' && role !== 'testAdmin')? "" : <Header />}
      <div className="flex">
        <div className={`${isToggleSideBar === false ? 'w-[20%] basis-[20%]' : 'w-[0%] basis-0'} transition-all duration-300 xs:hidden sm:hidden lg:block`}>
          <div className={`${isToggleSideBar === true  ? 'w-0  -left-[100%]' : 'fixed w-[20%] top-[70px]'} transition-all duration-300 xs:hidden sm:hidden lg:block`}>
            {isHideHeaderSideBar === true || (role !== 'admin' && role !== 'testAdmin')  ? "" : <SideBar />}
          </div>
        </div>

        
        <div className={` ${isHideHeaderSideBar === true && 'full'} ${isToggleSideBar === true ? 'w-[100%]' : 'xs:w-full sm:w-full lg:w-[80%]'} transition-all duration-300`}>
       
          <Routes>
          {/* <Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/product-list" element={<ProductList />} />
<Route path="/admin/product/details/:id" element={<AdminProductDetail />} />
<Route path="/admin/accessoryProduct/details/:id" element={<AdminAccessoryDetail />} />
<Route path="/admin/category/add" element={<AddCategory />} />
<Route path="/admin/category" element={<CategoryList />} />
<Route path="/admin/category/edit/:id" element={<UpdateCategory />} />
<Route path="/admin/product/upload" element={<AddProduct />} />
<Route path="/admin/product/edit/:id" element={<UpdateProduct />} />
<Route path="/admin/category/add/subcategory" element={<AddSubCat />} />
<Route path="/admin/category/subcategory/list" element={<SubcategoryList />} />
<Route path="/admin/product/productRam/add" element={<ProductRam />} />
<Route path="/admin/product/productWeight/add" element={<ProductWeight />} />
<Route path="/admin/product/productSize/add" element={<ProductSize />} />
<Route path="/admin/orders" element={<OrderList />} />
<Route path="/admin/uploadBanner" element={<HomeBanner />} />
<Route path="/admin/bannerList" element={<BannerList />} />
<Route path="/admin/updateBanner/:id" element={<UpdateBanner />} />
<Route path="/admin/sale-banner-upload" element={<SaleBannerUpload />} />
<Route path="/admin/sale-bannerList" element={<SaleBannerList />} />
<Route path="/admin/update-sale-banner/:id" element={<UpdateSaleBanner />} />
<Route path="/admin/add-accessory" element={<AddAccessory />} />
<Route path="/admin/accessory-list" element={<AccessoryList />} />
<Route path="/admin/update-accessory/:id" element={<UpdateAccessory />} />
<Route path="/admin/add-sub-products" element={<AddSubProduct />} />
<Route path="/admin/accessoryProduct/edit/:id" element={<UpdateAccessoryProduct />} /> */}

            <Route path="/admin/dashboard" element={   <ProtectedAdminRoute role={role}>
      <Dashboard />
    </ProtectedAdminRoute>} />
        
      
  <Route path="/admin/product-list" element={   <ProtectedAdminRoute role={role}>

  <ProductList />
  </ProtectedAdminRoute>} />

  <Route path="/admin/product/details/:id" element={<ProtectedAdminRoute role={role}><AdminProductDetail /></ProtectedAdminRoute>} />
<Route path="/admin/accessoryProduct/details/:id" element={<ProtectedAdminRoute role={role}><AdminAccessoryDetail /></ProtectedAdminRoute>} />
<Route path="/admin/category/add" element={<ProtectedAdminRoute role={role}><AddCategory /></ProtectedAdminRoute>} />
<Route path="/admin/category" element={<ProtectedAdminRoute role={role}><CategoryList /></ProtectedAdminRoute>} />
<Route path="/admin/category/edit/:id" element={<ProtectedAdminRoute role={role}><UpdateCategory /></ProtectedAdminRoute>} />
<Route path="/admin/product/upload" element={<ProtectedAdminRoute role={role}><AddProduct /></ProtectedAdminRoute>} />
<Route path="/admin/product/edit/:id" element={<ProtectedAdminRoute role={role}><UpdateProduct /></ProtectedAdminRoute>} />
{/* <Route path="/admin/category/add/subcategory" element={<ProtectedAdminRoute role={role}><AddSubCat /></ProtectedAdminRoute>} />
<Route path="/admin/category/subcategory/list" element={<ProtectedAdminRoute role={role}><SubcategoryList /></ProtectedAdminRoute>} /> */}
<Route path="/admin/product/productRam/add" element={<ProtectedAdminRoute role={role}><ProductRam /></ProtectedAdminRoute>} />
{/* <Route path="/admin/product/productWeight/add" element={<ProtectedAdminRoute role={role}><ProductWeight /></ProtectedAdminRoute>} />
<Route path="/admin/product/productSize/add" element={<ProtectedAdminRoute role={role}><ProductSize /></ProtectedAdminRoute>} /> */}
<Route path="/admin/orders" element={<ProtectedAdminRoute role={role}><OrderList /></ProtectedAdminRoute>} />
<Route path="/admin/uploadBanner" element={<ProtectedAdminRoute role={role}><HomeBanner /></ProtectedAdminRoute>} />
<Route path="/admin/bannerList" element={<ProtectedAdminRoute role={role}><BannerList /></ProtectedAdminRoute>} />
<Route path="/admin/updateBanner/:id" element={<ProtectedAdminRoute role={role}><UpdateBanner /></ProtectedAdminRoute>} />
<Route path="/admin/sale-banner-upload" element={<ProtectedAdminRoute role={role}><SaleBannerUpload /></ProtectedAdminRoute>} />
<Route path="/admin/sale-bannerList" element={<ProtectedAdminRoute role={role}><SaleBannerList /></ProtectedAdminRoute>} />
<Route path="/admin/update-sale-banner/:id" element={<ProtectedAdminRoute role={role}><UpdateSaleBanner /></ProtectedAdminRoute>} />
<Route path="/admin/add-accessory" element={<ProtectedAdminRoute role={role}><AddAccessory /></ProtectedAdminRoute>} />
<Route path="/admin/accessory-list" element={<ProtectedAdminRoute role={role}><AccessoryList /></ProtectedAdminRoute>} />
<Route path="/admin/update-accessory/:id" element={<ProtectedAdminRoute role={role}><UpdateAccessory /></ProtectedAdminRoute>} />
<Route path="/admin/add-sub-products" element={<ProtectedAdminRoute role={role}><AddSubProduct /></ProtectedAdminRoute>} />
<Route path="/admin/accessoryProduct/edit/:id" element={<ProtectedAdminRoute role={role}><UpdateAccessoryProduct /></ProtectedAdminRoute>} />

          </Routes>
        </div>
      </div>
    </div>
  )
}


        <Routes>
          <Route path="/" element={<><Home /></>} />
          <Route path="/product/:id" element={<><ProductDetails /></>} />
          <Route path="/accessory-product/:id" element={<><AccessoryProductDetails /></>} />
          <Route path="/cart" element={<><Cart /></>} />
          <Route path="/checkout" element={<><Checkout /></>} />
          <Route path="/signup" element={<><SignUp /></>} />
          <Route path="/verify" element={<><VarifyEmail /></>} />
          <Route path="/login" element={<><Login /></>} />
          <Route path="/forgot-password" element={<><ForgotPassword /></>} />
          <Route path="/my-account" element={<><MyAccount /></>} />
          <Route path="/orders" element={<><OrdersPage /></>} />
          <Route path="/wishlist" element={<><Wishlist /></>} />
          <Route path="/brand/:name" element={<><BrandCollection /></>} />
          <Route path="/search" element={<><SearchPage /></>} />
          <Route path="/all-products" element={<><AllProducts /></>} />
          <Route path="/sale-offer" element={<><SaleOffer /></>} />
          <Route path="/all-accessory" element={<><AllAccessoryProducts /></>} />
          <Route path="/single-accessory/:name" element={<><SingleAccessorypage /></>} />
          <Route path="/featured-product" element={<><FeaturedProducts /></>} />



          {/* Admin Routes */}

          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}

        </Routes>
      </MyContext.Provider>

      <Snackbar open={open.open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={open.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {open.message}
        </Alert>
      </Snackbar>


      {
        !isAmdin &&
          !isCheckout && !LoginSignup && !verifyEmail && !forgot && <Footer />
      }



    </>
  )
}

export default App
export { MyContext }
