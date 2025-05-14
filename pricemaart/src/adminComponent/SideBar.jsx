import { MdDashboard } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaAngleRight } from "react-icons/fa6";
import { GrProductHunt } from "react-icons/gr";

import { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { ImExit } from "react-icons/im";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiSolidCategory } from "react-icons/bi";
import { FaBoxes } from "react-icons/fa";
import { TiImage } from "react-icons/ti";
import { FiImage } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../store/feature/auth/authSlice";
import { MyContext } from "../App";
// import { Link } from "react-dom";
const SideBar = ({ onClose }) => {
    let [isSubmenuOpen, setSubmenuOpen] = useState(0)
let navigate = useNavigate()
    // let [toggleSubmenu,setToggleSubmenu] = useState(false)
    let setIndexForSubmenu = (index) => {

        // setSubmenuOpen(index)
        setSubmenuOpen(isSubmenuOpen === index ? null : index);

        // setToggleSubmenu(!toggleSubmenu )
    }
    let dispatch = useDispatch()
    let context = useContext(MyContext)
    const handleClickAndClose = (callback) => {
        if (onClose) onClose();
        if (callback) callback();
    };
    let handlelogout =  ()=>{
        
        onClose
             dispatch(logout())
                  .unwrap()
                  .then((response) => {
                    
                
                    if (response?.success === true) {
                      context.setOpen({ open: true, message: response?.message, severity: "success" });
                    navigate('/')
                    } else {
                      context.setOpen({ open: true, message: response?.message, severity: "error" });
                
                    }
                  })
    }

    return (
        <div className=" sideBar h-[100vh]  bg-white ">
            <ul className="overflow-y-scroll overflow-x-hidden   h-[90%]">
               <Link  to={'/admin/dashboard'} onClick={onClose}>
               <li className="px-4  mt-5 mb-1">

<Button className={`${isSubmenuOpen === 0 ? 'active' : ''}`} onClick={() => setSubmenuOpen(0)}>
    <span className="flex items-center gap-2"><MdDashboard className={`text-2xl ${isSubmenuOpen === 0 && "text-green-500"}`} />

        <p>Dashboard</p>
    </span>

</Button>

</li>
               </Link>
                <li className=" px-4 mb-1 relative ">

                    <Button className={`${isSubmenuOpen === 1 ? "active" : ''}`} onClick={() => setIndexForSubmenu(1)}>
                        <span className="flex items-center gap-2"><GrProductHunt className={`text-2xl ${isSubmenuOpen === 1 && "text-green-500"}`} />

                            <p>Products</p>
                        </span>
                        <span className="">{isSubmenuOpen === 1 ? <FaAngleDown /> : <FaAngleRight />}</span>
                    </Button>
                    <div className={`${isSubmenuOpen === 1 ? 'h-full opacity-100' : 'h-0 opacity-0'} transition-all duration-500 relative left-10`}>
                        <ul className="text-gray-600 submenu  text-[14px]  mt-2 flex flex-col gap-2 ">
                            <Link onClick={onClose} to={'/admin/product-list'}>
                            <li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Product List
                            </li></Link>

                            <Link onClick={onClose} to={'/admin/product/upload'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Product Upload
                            </li></Link>
                        
                            <Link onClick={onClose} to={'/admin/product/productRam/add'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Add Product Ram
                            </li></Link>
                            <Link onClick={onClose} to={'/admin/add-sub-products'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Add Sub Product 
                            </li></Link>
                        
                            {/* <Link onClick={onClose} to={'/product/productWeight/add'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Add Product Weight
                            </li></Link>
                            <Link onClick={onClose} to={'/product/productSize/add'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
                                Add Product Size
                            </li></Link> */}

                        </ul>
                    </div>

                </li>
                <li className=" px-4 mb-1 relative ">

                    <Button className={`${isSubmenuOpen === 2 ? "active" : ''}`} onClick={() => setIndexForSubmenu(2)}>
                        <span className="flex items-center gap-2"><BiSolidCategory className={`text-2xl ${isSubmenuOpen === 2 && "text-green-500"}`} />

                            <p>Category</p>
                        </span>
                        <span className="">{isSubmenuOpen === 2 ? <FaAngleDown /> : <FaAngleRight />}</span>
                    </Button>
                    <div className={`${isSubmenuOpen === 2 ? 'h-full opacity-100' : 'h-0 opacity-0'} transition-all duration-500 relative left-10`}>
                        <ul className="text-gray-600 submenu  text-[14px]  mt-2 flex flex-col gap-2 ">

                         

                            <li className="cursor-pointer sublist w-32 hover:text-green-500">
                                <Link onClick={onClose} to={'/admin/category/add'} >Add category</Link>
                            </li>
                            <li className="cursor-pointer sublist w-32 hover:text-green-500">
                                <Link onClick={onClose} to={'/admin/category'}>Category list</Link>
                            </li>
                            <li className="cursor-pointer sublist w-32 hover:text-green-500">
                                <Link onClick={onClose} to={'/admin/add-accessory'} >Add Accessory</Link>
                            </li>
                            <li className="cursor-pointer sublist w-32 hover:text-green-500">
                                <Link onClick={onClose} to={'/admin/accessory-list'} >Accessory list</Link>
                            </li>

                        </ul>
                    </div>

                </li>
                <li className=" px-4 mb-1 relative ">

                <Link onClick={onClose} to={'/admin/orders'}>
                <Button className={`${isSubmenuOpen === 3 ? "active" : ''}`} onClick={() => setIndexForSubmenu(3)}>
                        <span className="flex items-center gap-2"><FaBoxes className={`text-2xl ${isSubmenuOpen === 3 && "text-green-500"}`} />

                            <p>Orders</p>
                        </span>
                       
                    </Button>
                </Link>
                  

                </li>
                <li className=" px-4 mb-1 relative ">

<Button className={`${isSubmenuOpen === 4 ? "active" : ''}`} onClick={() => setIndexForSubmenu(4)}>
    <span className="flex items-center gap-2"><TiImage className={`text-2xl ${isSubmenuOpen === 4 && "text-green-500"}`} />

        <p className="text-nowrap">Home Banners</p>
    </span>
    <span className="">{isSubmenuOpen === 4 ? <FaAngleDown /> : <FaAngleRight />}</span>
</Button>
<div className={`${isSubmenuOpen === 4 ? 'h-full opacity-100' : 'h-0 opacity-0'} transition-all duration-500 relative left-10`}>
    <ul className="text-gray-600 submenu  text-[14px]  mt-2 flex flex-col gap-2 ">
        <Link onClick={onClose} to={'/admin/uploadBanner'}>
        <li className="cursor-pointer sublist w-32 hover:text-green-500">
            Banner Upload
        </li></Link>

        <Link onClick={onClose} to={'/admin/bannerList'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
            Banner list
        </li></Link>
    
   

    </ul>
</div>

</li>
                <li className=" px-4 mb-1 relative ">

<Button className={`${isSubmenuOpen === 5 ? "active" : ''}`} onClick={() => setIndexForSubmenu(5)}>
    <span className="flex items-center gap-2"><FiImage className={`text-2xl ${isSubmenuOpen === 5 && "text-green-500"}`} />

        <p className="text-nowrap">Sale Banners</p>
    </span>
    <span className="">{isSubmenuOpen === 5 ? <FaAngleDown /> : <FaAngleRight />}</span>
</Button>
<div className={`${isSubmenuOpen === 5 ? 'h-full opacity-100' : 'h-0 opacity-0'} transition-all duration-500 relative left-10`}>
    <ul className="text-gray-600 submenu  text-[14px]  mt-2 flex flex-col gap-2 ">
        <Link onClick={onClose} to={'/admin/sale-banner-upload'}>
        <li className="cursor-pointer sublist w-32 hover:text-green-500">
            Banner Upload
        </li></Link>

        <Link onClick={onClose} to={'/admin/sale-bannerList'}><li className="cursor-pointer sublist w-32 hover:text-green-500">
            Banner list
        </li></Link>
    
   

    </ul>
</div>

</li>


                <div className="h-32  flex justify-center items-center mb-8 mt-4 px-5">
                    <div className="bg-green-300 relative overflow-hidden w-full h-full flex justify-center rounded-lg items-center ">
                        <div className="logout bg-green-500 z-50 rounded-md hover:bg-green-600" onClick={
                        
                            handlelogout
                        }>
                            <Button><p className=" flex font-semibold text-white items-center "> <p className="text-xl"><ImExit /></p> LOGOUT</p></Button>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    )
}

export default SideBar