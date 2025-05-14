import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import { useNavigate } from "react-router-dom"

import { AiOutlineFullscreen } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/feature/whishList/whishList";
import { useContext, useState } from "react";
import axios from "axios";
import ProductPopup from "../components/ProductPopup";
import { MyContext } from "../App";
import AccessoryPopup from "../components/AccessoryPopup";
import BASE_URL from "../../apiConfig";
import LoaderOverlay from "../components/LoaderOverlay";

const AccessoryProduct = ({product}) => {
  let navigate = useNavigate()
  let [isOpen,setIsOpen] = useState(false)
  let [loading,setLoading] = useState(false)
  let [productData,setProductData] = useState({})
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist) || [];
let context = useContext(MyContext)
  // Check if product is already in wishlist
  const isInWishlist = product ? wishlist.find((item) => item._id === product._id) : false;
  if (!product) return null;
  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevent card click navigation

    if (isInWishlist) {
      dispatch(removeFromWishlist(product._id)); // Pass ID correctly for removal
      context.setOpen({open:true,message:'Remove from wishlist',severity:'success'})
    } else {
      dispatch(addToWishlist(product));
      context.setOpen({open:true,message:"Added to wishlist!",severity:'success'})

      
    }
  };
  let closeViewProduct = ()=>{
    setIsOpen(false)
  }

  let getSingleProd = async (id)=>{
    setLoading(true)
    try {
      let result = await axios.get(`${BASE_URL}/subProduct/single/${id}`,{
        
      },{
        withCredentials:true,
        headers:{
          'Content-Type':"application/json"
        }
      })
   
      setProductData(result.data)
      setLoading(false)
    
    
    } catch (error) {
      console.log(error)
      setLoading(false)
    
    
    }
    }
    let viewProductDetails = (id)=>{
      if(!loading){

        setIsOpen(true)
      }
    
      getSingleProd(id)
    }
  return (
    
   
   <div onClick={()=>{
    navigate(`/accessory-product/${product?._id}`)
  }} className="w-full xs:w-[100%] xsp:w-[100%] md:max-w-[350px]  lg:max-w-[300px] xsp:min-h-[180px] xs:min-h-[200px] min-h-[400px]  group relative py-4 overflow-hidden rounded-md cursor-pointer  border bg-white pb-2">
  <div className='h-[250px] xsp:h-[160px] md:w-[] xs:h-[220px] w-[100%] flex justify-center relative mx-auto'>
    <div className='h-full w-full  xsp:w-[180px] xs:w-[200px]  md:w-[230px] lg:w-[240px]'>
    <img src={product?.images[0]} alt="productImage" className='w-full h-full object-contain   hover:scale-110 transition-all duration-300' />
    <div className='absolute top-3 left-3'>
        <p className='bg-secondary w-[40px] text-center text-white'>{product?.offer == true ? 'sale':''}</p>
        
    </div>
    </div>
  </div>
  <div className='absolute top-4 xs:opacity-100 sm:opacity-100 md:opacity-100 xs:right-2 sm:right-4 lg:opacity-0 lg:group-hover:opacity-100  gap-3 flex flex-col  transition-opacity duration-300 ease-in-out' >
  <div>
    <button onClick={(e) => {
    e.stopPropagation();
    viewProductDetails(product?._id);
  }}>
      <AiOutlineFullscreen className='bg-white shadow shadow-black rounded-full xs:w-8 xs:h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 p-2 hover:bg-secondary'/>
    </button>
    <p
          onClick={handleWishlist}
          className="bg-white shadow shadow-black rounded-full text-2xl xs:w-8 xs:h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 p-2 flex justify-center items-center hover:bg-secondary"
        >
          {isInWishlist ? (
            <IoMdHeart className="text-red-500 text-2xl " />
          ) : (
            <IoMdHeartEmpty className="text-2xl " />
          )}
        </p>
  </div>
</div>
<div className='flex flex-col items-center mt-5'>
     <span className='xsp:text-[10px] xs:text-[12px] text-[14px] px-3 text-center font-semibold text-gray-700'> 
     {product?.name}
     </span>
     <div className='flex gap-1 xsp:flex-col xsp:gap-0 xs:text-[12px]'>
         <p className='line-through xsp:text-red-400 text-gray-500'>Rs.{product?.oldprice}</p>
         <span>Rs.{product?.price}</span>
     </div>
     <div className='flex gap-3 mt-2'>
      {
        product &&
        product.phoneSpecs && 
        product.phoneSpecs.color && 
        product.phoneSpecs.color.map((col)=>{
          return(
            <div key={col} className='xs:w-[15px] xs:h-[15px] w-[20px] h-[20px] bg-red-500 border shadow-sm shadow-gray-400  rounded-full' style={{backgroundColor:`${col}`}}></div>
          )
        }) 

      }
         
         
     </div>
   </div>
     <LoaderOverlay loading={loading}/>
   {
     isOpen  && !loading && <AccessoryPopup  productId = {product?._id} productData = {productData} closeViewProduct={closeViewProduct}/>
      }
 </div>
   
 
  )
}

export default AccessoryProduct