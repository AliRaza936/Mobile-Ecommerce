import Dialog from "@mui/material/Dialog";
// import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Slide from "@mui/material/Slide";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { CiHeart } from "react-icons/ci";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import format from 'format-number'

import 'swiper/css';
import 'swiper/css/pagination';
import { IoCart } from "react-icons/io5";
import QuantityDrop from "./QuantityDrop";
import InnerZoomComp from "./InnerZoom";
import { MyContext } from "../App";

import { FaHeart } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/feature/cart/cartSlice";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { addToWishlist, removeFromWishlist } from "../store/feature/whishList/whishList";
import LoaderOverlay from "./LoaderOverlay";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AccessoryPopup = ({ closeViewProduct ,productData,productId,averageRating}) => {
  console.log(productData)
let context = useContext(MyContext)
let dispatch = useDispatch()
let [isInWishlist, setIsInWishlist] = useState(false);
const wishlist = useSelector((state) => state.wishlist);


const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
       
      context.setOpen({ open: true, message: "Removed from Wishlist", severity: "info" });
    } else {
      dispatch(addToWishlist(productDetails));
     
      context.setOpen({ open: true, message: "Added to Wishlist", severity: "success" });
    }
  };
let [inputQuantity,setInputQuantity] = useState()
 let [productDetails, setProductDetails] = useState({
  name: "",
  
  discount:'',
  price: "",
  images: "",

});
let quantity = (val)=>{
    setInputQuantity(val)
  }
  let updateQuantity = ()=>{

  }
    let [color ,setColor] = useState('')
    let [changeImage,setChangeImage] = useState(0)


let id = productId

let hanldeAddToCart = ()=>{
    dispatch(addToCart({id,name,price,pictureUrl,color,discount,quantity:inputQuantity,productType,modelType}))
    context.setOpen({open:true,message:'product add in cart',severity:'success'})

  }
 
  let {name,price,images,discount} = productDetails
  let productType = true
  let modelType = 'AccessoryProduct'
  let pictureUrl = images[0]
        useEffect(() => {
          
            if (productData && productData.product) {
              setProductDetails(productData.product);
            }
          }, [productData]);

  let changeColor = (col,i)=>{
    setColor(col)
    setChangeImage(i)
}
useEffect(() => {
    if (wishlist.find(item => item._id === productId)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlist, productId]);
 useEffect(() => {
        if (productData.product && productData.product.phoneSpecs && productData.product.phoneSpecs.color && productData.product.phoneSpecs.color.length > 0) {
        
          setColor(productData.product.phoneSpecs.color[0])
        }
      }, [productData])
  return (
   <>
       <Dialog
         open={true}
         onClose={(e) => {closeViewProduct(),e.stopPropagation()}}
         className="productModel  relative "
         TransitionComponent={Transition}
         keepMounted
         scroll="body"              // important: makes dialog content scroll with page
         disableScrollLock={false} 
         fullWidth
   maxWidth="md"
       
        
       >


        <div onClick={(e) => e.stopPropagation()}   className="pt-5 px-5 "
   >
           <div className="">
           <button
             className="absolute right-4 text-2xl bg-green-200 hover:bg-green-300 p-1 rounded-full z-20"
             onClick={() => closeViewProduct()}
           >
             <IoClose />
           </button>
 
           <h2 className="text-lg leading-tight pr-7 font-medium capitalize">
             {productData?.product?.name}
           </h2>
           <div className="sm:flex gap-7 my-2 ">
             <div className="flex">
               <span>Brands: <span className="font-semibold  uppercase">
               {productData?.product?.catName}</span></span>
               
             </div>
             <div>
               <Rating
                 name="half-rating-read"
                 value={averageRating}
                 precision={0.1}
                 readOnly ={true}
                 size="medium"
               />
             </div>
           </div>
 
           <hr />
           <div className="flex flex-col sm:flex-row mt-4 gap-5">
 
 <div className="md:w-[50%]  sm:w-[100%] flex justify-center">
 <InnerZoomComp product = {productData} changeImage = {changeImage} setChangeImage={setChangeImage}/>
 </div>           
             <div className="pl-3  flex flex-col  gap-2">
               <div className="flex gap-2">
                 <p className="text-gray-600 text-lg font-semibold line-through">
                   RS:{format()(productData?.product?.oldprice)}
                 </p>
                 <span className="text-red-600 text-lg font-semibold">
                   RS: {format()(productData?.product?.price)}
                 </span>
               </div>
               <p className="font-semibold text-gray-500">
                   {productData?.product?.countInStock !=0 ? (
                     <span className="text-green-600 ">In Stock</span>
                   ) : (
                     <span className="text-red-600">Out of Stock</span>
                   )}
                 </p>
               <span className="text-[15px]">
                 {productData?.product?.description}
               </span>
               <div>
         <span className="flex gap-2 uppercase">color: <p className="font-semibold">{color}</p></span>
         <div className='flex gap-3 mt-2'>
       {
        productData.product &&
        productData.product.phoneSpecs && 
        productData. product.phoneSpecs.color && 
        productData. product.phoneSpecs.color.map((col,i)=>{
           return(
             <div key={i} onClick={()=>changeColor(col,i)} className='w-[30px] h-[30px] bg-red-500 border shadow-sm shadow-gray-400 cursor-pointer rounded-full' style={{backgroundColor:`${col}`}}></div>
           )
         }) 
 
       }
          
          
      </div>
      
        </div>
          
           <div className="sm:gap-2 sm:items-center sm:w-full sm:flex    mt-4">
                          <div className="flex">
                          <QuantityDrop className='' updateQuantity={updateQuantity} quantity={quantity} id={id}/>
          
                          </div>
                          <div className=" md:ml-5 xs:mt-2 ">
                          <button onClick={(e) => { e.stopPropagation(); hanldeAddToCart(); }}  disabled={productData?.product?.countInStock !=0 ? false : true} className={`flex sm:w-[110px] sm:p-2 sm:text-[18px] w-[170px] p-2 rounded-full  justify-center md:text-lg font-semibold bg-primary text-white items-center hover:bg-secondary ${productData?.product?.countInStock !=0 ? '': 'cursor-not-allowed line-through'}`}>
                              <IoCart />
                              <span className="sm:text-[14px]">Add To Cart</span>
                            </button>
                           
                          </div>
                     
                      </div>
             
             
               <div className="flex gap-5 my-2">
               <button onClick={(e) => { e.stopPropagation(); handleWishlist(); }} 
   className="flex gap-1 bg-green-200 rounded-full p-1 px-3 items-center text-sm hover:bg-green-300">
   {isInWishlist ? <FaHeart className="text-red-500" /> : <IoMdHeartEmpty />}
   <span className="text-[11px]">{isInWishlist ? "WISHLISTED" : "ADD TO WISHLIST"}</span>
 </button>
               </div>
             </div>
           </div>
 
           </div>
          
         </div>
         
       </Dialog>
     </>
  );
};

export default AccessoryPopup;
