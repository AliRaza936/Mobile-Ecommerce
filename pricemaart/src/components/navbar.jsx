import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaCartArrowDown, FaHeart, FaUser } from 'react-icons/fa6'
import logo from '/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MyContext } from '../App'
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { Divider, Menu, MenuItem } from '@mui/material'
import { IoBagCheck } from 'react-icons/io5'
import { LuLogOut } from "react-icons/lu";
import { logout } from '../store/feature/auth/authSlice'
import { IoIosSearch } from "react-icons/io";
import Search from './Search'
import Accessory from './Accessory'
import SideMenu from './SideMenu'


import { X } from 'lucide-react';



const Navbar = () => {
  let context = useContext(MyContext)
  let navigate = useNavigate()
  let dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const popupRef = useRef(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLoginClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
   
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
   
  };
  const handleSearchPopup = () => context.setIsOpenPopup(true);
  const closeSearch = () => context.setIsOpenPopup(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        context.setIsOpenPopup(false);
      }
    };

    if (context.isOpenPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [context.isOpenPopup]);


  let handleLogout =  ()=>{
    handleClose()
    dispatch(logout())
             .unwrap()
             .then((response) => {
               
           
               if (response?.success === true) {
                
                 context.setOpen({ open: true, message: response?.message, severity: "success" });
       
              localStorage.removeItem('user')
              localStorage.removeItem('authToken')
                 setTimeout(() => {
                  navigate('/'); // Navigate to home
                  window.location.reload(); // Reload the page
                }, 1000);
               } else {
                 context.setOpen({ open: true, message: response?.message, severity: "error" });
                 
               }
             })
             .catch((error) => {
             
               context.setOpen({ open: true, message: error, severity: "error" });
               
             });
    
};

  let cartItems = useSelector((state) => state?.cart);
  return (
<>
<div  className='sticky top-0 z-[10] '>
     <div className="bg-primary sm:pl-2 sm:pr-4 xs:px-2 md:pl-2 md:pr-4 xs:pr-4 lg:px-12 py-0 lg w-full">
     
               <nav className="flex justify-between items-center">
                   <div className="flex items-center " >
                   <div>
        <SideMenu/>
      </div>
                    
                  <Link to={'/'}>
                  <div className="xs:w-[55px] xs:h-[55px] w-[70px] h-[70px]">
     <img 
       src={logo} 
       alt="Website Logo" 
       className="fill-white text-white w-auto h-auto"
     />
   </div>
                  </Link>
                     
                      
                   </div>
                   <div className='w-[40%] xs:hidden sm:hidden md:hidden hlg:block'>
                    <ul className='flex justify-evenly w-full'>
                      <Link to={'all-products'}>
                      <li className=' md:text-[14px] font-semibold uppercase text-white'>
                        smartphone
                      </li></Link >
                      <div className="relative group">
  <Link to={'all-accessory'}>
  <li className="c md:text-[14px] font-semibold uppercase text-white cursor-pointer">
    Accessories
  </li></Link>
  <ul className={`absolute ${context?.accessory.length !== 0 ?'group-hover:flex ':"" } hidden  flex-col bg-white text-black p-2 rounded shadow-lg min-w-[250px] z-50`}>
    {context?.accessory.map((item, index) => (
      <Link key={index} to={`/single-accessory/${item?.name}`}>
        <li className="hover:bg-gray-100 px-4 py-2"><div className='flex gap-2 items-center'>
          <img src={item.images} alt="" className='w-[40px]'/>
          <h1 className='capitalize'>
          {item.name}
          </h1>
          </div></li>
      </Link>
    ))}
  </ul>
</div>
                      <Link to={'/sale-offer'}>
                      <li className='c md:text-[14px] font-semibold uppercase text-white'>
                        offer/deals
                      </li></Link>
                   
                     
                      
                    </ul>
                   </div>
                 
                     

                   <div className="flex items-center gap-4 ">
                   <div className='mx-4 flex xs:hidden sm:hidden  md:block'>
                        <Search/>
                      </div>
                   <div onClick={handleSearchPopup} className='xs:flex sm:flex  md:hidden nlg:hidden xs:w-[30px] xs:h-[30px] sm:w-[35px] sm:h-[35px] w-[40px] h-[40px] border-2 py-2 flex justify-center items-center cursor-pointer rounded-full'>
                      <div>
                        <IoIosSearch   className=' text-[20px] xs:text-[16px] sm:text-[15px] md:text-[17px] text-white'/>
                      </div>
                    </div>
                    <Link to={'/wishList'} className='hidden   w-[35px]   h-[35px] border-2 py-2 nlg:flex justify-center items-center cursor-pointer rounded-full'>
                      <div>
                        <FaRegHeart className='nlg:text-[18px]  xs:text-[13px] sm:text-[15px] text-white'/>
                      </div>
                    </Link>
                  
                   {
                    context.isLogin == false ?       
                    <div>
                       <div className= ' nlg:flex gap-4 xs:hidden sm:hidden '>
                    <div     className=''>
                     <Link to={'/login'}> <button className="bg-white nlg:w-[70px] xl:w-[90px] py-2 rounded-md nlg:text-[15px] text-primary ">Login</button></Link>
                      </div>
                       <div>
                       <Link to={'/signup'}><button className=" xl:w-[90px] nlg:w-[70px] nlg:text-[15px] py-2 rounded-md border text-white ">Register</button></Link>
                       </div>
                       
                    </div>
                
                  
                    <div onClick={handleLoginClick} className='nlg:hidden xs:w-[30px] xs:h-[30px] w-[40px] sm:w-[35px] sm:h-[35px] h-[40px] border-2 py-2 flex justify-center items-center cursor-pointer rounded-full'>
                      <div>
                        <FaRegUser className='sm:text-[15px] xs:text-[13px] text-[20px] text-white'/>
                      </div>
                 
                   </div>
                    </div> :
                    <div onClick={handleClick} className='xs:w-[30px] xs:h-[30px] w-[40px] sm:w-[35px] sm:h-[35px] h-[40px] border-2 py-2 flex justify-center items-center cursor-pointer rounded-full'>
                      <div>
                        <FaRegUser className='nlg:text-[18px]  xs:text-[13px] sm:text-[15px] text-white'/>
                      </div>
                    </div>
                   }
                  
                    <Menu
        anchorEl={anchorEl2}
        id="account-menu"
        open={open2}
        onClose={handleClose2}
        onClick={handleClose2}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -1.5,
                mr: 1,
              },
           
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <div className="flex px-2 items-center w-[230px] mb-2 mt- ">
        
        <h2 className='text-xl mx-auto font-semibold'>Login/Register</h2>
        </div>

        
   <Divider/>
        <Link to={'/login'}>
        <MenuItem className="flex gap-3 " onClick={handleClose2}>
         <div className='bg-primary w-full rounded-full text-white text-center'>
          <button className='p-1  '>Login</button>
         </div>
        </MenuItem>
        </Link>
      
        <MenuItem  className="flex gap-3"  onClick={handleClose2}>
        <div className='flex text-[14px] justify-center w-full text-center'>
<span>New User?</span>
<Link to={'/signup'} className='underline'>
Register Now
</Link>
        </div>
        </MenuItem>
      
        
       
      </Menu>
              
                    
                    {context.isOpenPopup && (
        <div className="fixed inset-0 z-50 flex flex-col">
          {/* Dim background */}
          <div className="absolute inset-0 bg-black opacity-70"></div>

          {/* White Search Box */}
          <div
            ref={popupRef}
            className="relative bg-white z-10 w-full p-4 sm:p-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">What are you looking for?</h2>
              <X className="cursor-pointer" onClick={closeSearch} />
            </div>

            <div className="mt-3 relative">
             <Search/>
             
            </div>
          </div>
        </div>
      )}
                  
                    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -1.5,
                mr: 1,
              },
           
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
       
        <div className="flex px-2 items-center w-[230px] mb-2 mt- ">
        
        <h2 className='text-xl mx-auto font-semibold'>Your Account</h2>
        </div>

        
   <Divider/>
        <Link to={'/my-account'}>
        <MenuItem className="flex gap-3" onClick={handleClose}>
          <FaUser className="text-gray-600" /> My account
        </MenuItem>
        </Link>
       
        <Link to={'/orders'}>
        <MenuItem  className="flex gap-3"  onClick={handleClose}>
         <IoBagCheck  className="text-gray-600"/>
         Orders
        </MenuItem></Link>
      
        
        <MenuItem  className="flex gap-3" onClick={handleLogout}>
       
        <LuLogOut   className="text-gray-700"/>
          Logout
      
        </MenuItem>
      </Menu>
              
                    
                      <Link to={'/cart'}> <div  className="relative ">
                      <span className=''><FaCartArrowDown  className="xs:text-[26px] sm:text-[30px] text-4xl text-white"/></span>
                      <p className="absolute -top-2 -right-2 bg-red-500 xs:w-[15px] xs:h-[15px] xs:text-[10px] sm:w-[17px] sm:h-[17px] sm:text-[12px] w-[20px] h-[20px] rounded-full flex justify-center items-center text-white " >{cartItems?.items?.length}</p>
                   </div></Link>
                   </div>
                   
               </nav>
              
           </div>
           
       
  </div>
 
</>
  )
}

export default Navbar