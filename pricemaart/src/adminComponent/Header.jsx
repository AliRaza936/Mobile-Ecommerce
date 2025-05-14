
import { MdOutlineMenuOpen } from "react-icons/md";
import Button from "@mui/material/Button";

import { useContext, useEffect, useState } from "react";
import { MdOutlineMenu } from "react-icons/md";


import React from 'react'


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import ProfileImage from "./ProfileImage";
import { MyContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import logo from '/logo.png'
import SideBar from "./SideBar";

const Header = () => {

  let context = useContext(MyContext)
  const [open, setOpen] = useState({ open: false, message: '', severity: '' });

  const [isToggleSideBar, setIsToggleSideBar] = useState(false);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  useEffect(() => {
    setIsToggleSideBar(false);
  }, []);

  return (
    <>
      <div className="bg-white sticky top-0 z-50 px-5 py-3 ">
        <div className="flex justify-between items-center h-[50px]">
          <div className="flex w-[280px] justify-between items-center">
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <div className="flex gap-3 lg:hidden">
                <Button onClick={() => setIsToggleSideBar(true)} className="menuBtn group">
                  {isToggleSideBar === false ? (
                    <MdOutlineMenuOpen className="text-[2rem] text-black group-hover:text-green-400 transition-all" />
                  ) : (
                    <MdOutlineMenu className="text-[2rem] text-black group-hover:text-green-400 transition-all" />
                  )}
                </Button>
              </div>

             <Link to={'/admin/dashboard'}>
             <div className="w-[80px] xs:w-[60px]">
                <img src={logo} alt="" />
              </div></Link>
            </div>

            {/* Desktop Menu Button */}
            <div className="gap-3 hidden lg:flex">
              <Button onClick={() => context.setIsToggleSideBar(!context.isToggleSideBar)} className="menuBtn group">
                {isToggleSideBar === false ? (
                  <MdOutlineMenuOpen className="text-[2rem] text-black group-hover:text-green-400 transition-all" />
                ) : (
                  <MdOutlineMenu className="text-[2rem] text-black group-hover:text-green-400 transition-all" />
                )}
              </Button>
            </div>
          </div>

          {/* Right section: User Info */}
          <div className="flex items-center gap-4">
          <div>
{
 context.isLogin === true ?
 <div  className="flex items-center" sx={{ textTransform: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',fontSize: 'inherit', 
    fontFamily: 'inherit', 
    fontWeight: 'inherit', 
    lineHeight: 'inherit', 
    color: 'inherit'  }}>
              <ProfileImage user={context?.userData}/>
               <div className="text-start  ml-3 leading-[15px]">
                <p className=" font-bold xs:hidden">{context?.userData?.name}</p>
                <span className="text-sm xs:hidden">{context?.userData?.email}</span>
               </div>
               
            </div>:<Link to={'/login'}><div className="bg-green-500 rounded-full hover:bg-green-600 "><Button sx={{borderRadius:'50%',paddingInline:'20px',textTransform:'none '}}><p className="text-white font-semibold text-[15px]">Sign In</p></Button></div></Link>
}

</div>
          </div>
        </div>
      </div>

      <Snackbar open={open.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={open.severity} variant="filled" sx={{ width: '100%' }}>
          {open.message}
        </Alert>
      </Snackbar>

      {/* SideBar Drawer for Mobile */}
      <div
        className={`fixed top-0 h-full z-50 transition-all duration-300 lg:hidden 
          ${isToggleSideBar ? 'left-0' : '-left-full'} xsp:w-[70%] xs:w-[60%] w-[40%] bg-white overflow-hidden`}
      >
        <div className="flex justify-end p-2">
          <button onClick={() => setIsToggleSideBar(false)} className="text-xl font-bold">
            ✖
          </button>
        </div>
        <SideBar onClose={() => setIsToggleSideBar(false)}  />
      </div>
      {isToggleSideBar && (
  <div 
    className="fixed inset-0 bg-black bg-opacity-30 z-40 lg::hidden"
    onClick={() => setIsToggleSideBar(false)}
  />
)}
    </>
  );
};

export default Header;




