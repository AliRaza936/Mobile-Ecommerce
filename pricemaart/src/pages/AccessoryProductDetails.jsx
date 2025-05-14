import { useContext, useEffect, useState } from "react";
import InnerZoomComp from "../components/InnerZoom"
import { FaRegHeart } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import moment from 'moment'
import Rating from '@mui/material/Rating';
import QuantityDrop from "../components/QuantityDrop";
import { MdCompareArrows } from "react-icons/md";
import { IoCart } from "react-icons/io5";

import { useNavigate, useParams } from "react-router-dom";
import format from 'format-number'
import axios from "axios";
import { MyContext } from "../App";
import { FaHeart } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getAccSingleProd } from "../store/feature/product/productSlice";
import { addToCart } from "../store/feature/cart/cartSlice";
import ReviewPage from "../components/ReviewPage";
import BASE_URL from "../../apiConfig";
import LoaderOverlay from "../components/LoaderOverlay";
const AccessoryProductDetails = () => {
  let dispatch = useDispatch();
  let product = useSelector((state)=>state.product?.accProduct)
  let loading = useSelector((state)=>state.product?.loading)
  let context = useContext(MyContext)
 let navigate = useNavigate()
 let [activeColor,setActiveColor] = useState(0)
 let [productDetails, setProductDetails] = useState({
  name: "",
  
  discount:'',
  price: "",
  images: "",

});
    let [color ,setColor] = useState('')
    let [changeImage,setChangeImage] = useState(0)

let [CatProductId,setCatProductId] = useState('')


let {id} = useParams()

let [relatedProducts,setRelatedProducts] = useState([])

let [reviewData,setReviewData] = useState({})



 let [inputQuantity,setInputQuantity] = useState()


  let quantity = (val)=>{
    setInputQuantity(val)
  }
  let updateQuantity = ()=>{

  }
  
  let [isInWishlist, setIsInWishlist] = useState(false);
  const wishlist = useSelector((state) => state.wishlist);

  let hanldeAddToCart = ()=>{
    dispatch(addToCart({id,name,price,pictureUrl,color,discount,quantity:inputQuantity,productType,modelType}))
    context.setOpen({open:true,message:'product add in cart',severity:'success'})

  }
  let {name,price,images,discount} = productDetails
  let productType = true
  let modelType = 'AccessoryProduct'
  let pictureUrl = images[0]

    let changeColor = (col,i)=>{
        setColor(col)
        setActiveColor(i)
        setChangeImage(i)
    }

useEffect(() => {
    if (wishlist.find(item => item._id === id)) {
      setIsInWishlist(true);
    } else {
      setIsInWishlist(false);
    }
  }, [wishlist, id]);
let relatedProduct = async (CatProductId,id)=>{

  try {
    let result = await axios.get(`${BASE_URL}/subProduct/all?catName=${CatProductId}`,{

    },{
      withCredentials:true,
      headers:{
        'Content-Type':"multipart/form-data"
      }
      
    })
   console.log('first,',result)

      let filterProduct = result?.data?.products?.filter((product)=>product._id !== id)
      
      setRelatedProducts(filterProduct)
      
  
  } catch (error) {
    console.log(error)
  }
  }

 
  useEffect(() => {
    if (product?.product?.catName) {
    const encodedName = encodeURIComponent(product?.product?.catName);

        setCatProductId(encodedName);
        
    }
   
}, [product]);
useEffect(()=>{
    // window.scrollTo(0,0)
    const encodedName = encodeURIComponent(product?.product?.catName);

    setCatProductId(encodedName);


},[])
useEffect(()=>{
  
  dispatch(getAccSingleProd(id))
  setChangeImage(0)

},[id,dispatch])
useEffect(() => {
  if (product && product.product) {
    setProductDetails(product.product);
  }
}, [product]);

const averageRating = reviewData.length
? Math.floor((reviewData.reduce((acc, r) => acc + r.rating, 0) / reviewData.length) * 10) / 10
: 0;
let allReviews = async ()=>{
   

  try {

    let result = await axios.get(`${BASE_URL}/review/all`,{
      params: {
          productId: id
        },
    },{
     
      withCredentials:true,
      headers:{
        'Content-Type':"application/json"
      }
    })
  console.log('all review',result.data)
    setReviewData(result?.data?.reviews)
  
  } catch (error) {
    console.log(error)
  }

  }
useEffect(() => {


  if (CatProductId) {
    relatedProduct(CatProductId, id);
  }
}, [id, CatProductId]);

useEffect(()=>{
  window.scrollTo(0,0)
  allReviews()
},[id])
  
    useEffect(() => {
        if (product.product && product.product.phoneSpecs && product.product.phoneSpecs.color && product.product.phoneSpecs.color.length > 0) {
        
          setColor(product.product.phoneSpecs.color[0])
        }
      }, [product])
  
  return (
    <>
    <LoaderOverlay loading={loading}/>
       <div className="flex justify-center lg:pr-10 py-5">
    <div className="w-full  max-w-[1350px]  px-5  mt-7 ">
    <div className="flex justify-between xs:pr-2">
      <div className=" w-full">
         <div className ="max-w-[1350px] w-full ">
<div className="flex xs:block gap-10  ">
                 <div className="xs:flex justify-center xs:w-full ">
            <InnerZoomComp product = {product} changeImage = {changeImage} setChangeImage={setChangeImage}/>
        </div>
        <div className=" sm:pr-2 xs:pr-2 flex  flex-col xs:mt-4 gap-1">
        <h2 className="text-3xl xs:text-xl  text-gray-700 font-semibold">{product?.product?.name}</h2>
        <div className="sm:flex  items-center gap-3 mb-3">
            <span className="text-gray-600 flex gap-1 ">Brands: <p className="font-semibold">{product?.product?.catName}</p></span>
          
          <div className="flex items-center">
          <Rating className="-z-10" name="read-only" value={averageRating} precision={0.1} size="small"  readOnly />
          <p className="text-gray-600">({reviewData?.length || 0})Review</p>
          </div>
        </div  >
        <p className="font-semibold text-gray-500">
                  {product?.product?.countInStock !=0 ? (
                    <span className="text-green-600 ">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </p>
        <div className="md:flex items-center  my-2 gap-2">
          <div className="flex gap-2 mb-2">
          <span className="text-gray-500 xs:text-[15px] text-lg line-through font-semibold">RS.{format()(product?.product?.oldprice)}</span><p className="text-lg text-red-500 xs:text-[15px] font-semibold">RS.{format()(product?.product?.price)}</p>
          </div>
            {product?.product?.oldprice && product?.product?.price && (
    <>
      <span className="xs:text-[14px] pl-3 border-black text-nowrap border-l-[2.3px] font-semibold">
        Save RS: {format()(product?.product?.oldprice - product?.product?.price)}
      </span>
      <span className="text-red-500 text-nowrap text-sm xs:text-[14px]">
        ({Math.round(((product?.product?.oldprice - product?.product?.price) / product?.product?.oldprice) * 100)}% off)
      </span>
    </>
  )}
            </div>
     <p className="my-2 xs:text-[14px]">Shipping calculated at checkout.</p>
       <div>
        <span className="flex gap-2 uppercase xs:text-[14px]">color: <p className="font-semibold xs:text-[14px]">{color}</p></span>
        <div className='flex gap-3 mt-2'>
      {
       product.product &&
       product.product.phoneSpecs && 
       product. product.phoneSpecs.color && 
       product. product.phoneSpecs.color.map((col,i)=>{
          return(
            <div key={i} onClick={()=>changeColor(col,i)} className={`w-[35px] h-[35px] xs:w-[25px] xs:h-[25px] bg-red-500  shadow-sm shadow-gray-400 cursor-pointer rounded-full ${activeColor == i && 'border-red-600 border-[2.5px]'}`} style={{backgroundColor:`${col}`}}></div>
          )
        }) 

      }
         
         
     </div>
     
       </div>
       {isInWishlist === true && <div className="flex items-center gap-2 mt-3">
        <FaHeart className='text-red-600 text-sm '/> 
        <p className="text-sm">Available in Wishlist</p>
        </div>}
            <div className=" xs:flex sm:gap-2  xs:gap-2 xs:items-center xs:w-full sm:flex  sm:items-center mt-4">
                <div className="flex">
                <QuantityDrop className='' updateQuantity={updateQuantity} quantity={quantity} id={id}/>

                </div>
                <div className=" md:ml-5">
                <button onClick={hanldeAddToCart} disabled={product?.product?.countInStock !=0 ? false : true} className={`flex xs:w-[110px] xs:p-1 xs:text-[16px] w-[170px] p-2 rounded-full  justify-center text-lg font-semibold bg-primary text-white items-center hover:bg-secondary ${product?.product?.countInStock !=0 ? '': 'cursor-not-allowed line-through'}`}>
                    <IoCart />
                    <span className="xs:text-[14px]">Add To Cart</span>
                  </button>
                 
                </div>
           
            </div>
            
        </div>
        
            </div>
       <br /><hr />
       <div className="flex justify-center flex-col items-center">
<h1 className="font-semibold mb-3">PRODUCT DETAILS</h1>

<p className="text-[14px] t">{product?.product?.description}</p>

<div className=" w-full">
<h2 className="text-center text-2xl font-semibold mb-4">Specs</h2>
<table className="w-full border-collapse">
<thead>
<tr>
<th rowSpan={2} className="border border-gray-300 p-3 text-left py-5     xs:text-[12px]   text-[14px]">WEIGHT</th>

</tr>
<tr>

<td className="border border-gray-300 p-3 uppercase font-medium    xs:text-[12px]   text-[14px]">{product?.product?.phoneSpecs?.weight ||"NA"} </td>
</tr>
</thead>
<tbody>
<tr className="">
<th className="border border-gray-300 p-3 py-5 text-left    xs:text-[12px]   text-[14px]">MATERIAL </th>
<td colSpan="2" className="border border-gray-300 p-3    xs:text-[12px]   font-medium text-[14px]">
{product?.product?.phoneSpecs?.material || "NA"}
</td>
</tr>
<tr>
<th className="border border-gray-300 p-3 text-left py-5    xs:text-[12px]   text-[14px]">WATER RESISTANCE </th>
<td colSpan="2" className="border border-gray-300 p-3    xs:text-[12px]   font-medium text-[14px]"> {product?.product?.phoneSpecs?.waterResistance || 'NA'}</td>
</tr>
<tr>
<th className="border border-gray-300 p-3 text-left    xs:text-[12px]   py-5  text-[14px]">CONNECTIVITY TYPE </th>
<td colSpan="2" className="border border-gray-300 p-3    xs:text-[12px]   font-medium text-[14px]"> {product?.product?.phoneSpecs?.connectivity || 'NA'}</td>
</tr>

<tr>
<th className="border border-gray-300 p-3 text-left py-5    xs:text-[12px]   text-[14px]">BATTERY </th>
<td colSpan="2" className="border border-gray-300 p-3    xs:text-[12px]  font-medium text-[14px]" > {product?.product?.phoneSpecs?.batteryCapacity ||'NA'}</td>
</tr>
<tr>
<th className="border border-gray-300 p-3 text-left py-5    xs:text-[12px]   text-[14px]">CHARGING TIME </th>
<td colSpan="2" className="border border-gray-300 p-3     xs:text-[12px]  font-medium text-[14px]"> {product?.product?.phoneSpecs?.chargingTime || 'NA'}</td>
</tr>
<tr>
<th className="border border-gray-300 p-3 text-left py-5     xs:text-[12px]  text-[14px]">BACKUP TIME </th>
<td colSpan="2" className="border border-gray-300 p-3    xs:text-[12px]   font-medium text-[14px]"> {product?.product?.phoneSpecs?.backupTime||"NA"}</td>
</tr>
<tr>
<th className="border border-gray-300 p-3 text-left py-5    xs:text-[12px]   text-[14px]">WARRANTY </th>
<td colSpan="2" className="border border-gray-300 p-3     xs:text-[12px]  font-medium text-[14px]"> {product?.product?.phoneSpecs?.warranty||'NA'}</td>
</tr>
</tbody>
</table>
</div>
</div> 


<div className="mt-6 pt-6">
  <h2 className="text-xl font-semibold text-center mb-3">Product Reviews</h2>
      <ReviewPage productId = {id} allReviews = {allReviews} reviewData = {reviewData}/>
    </div>
  
          </div>
     
      </div>
         
      
<div className="sm:hidden xs:hidden lg:flex">
  
{
  relatedProducts.length !== 0 && 
  <div className="">
               <h1 className="font-semibold text-xl text-gray-700">Related Products</h1>
               {
                relatedProducts &&
                relatedProducts?.slice(0,5).map((product)=>{
                  return(
                    <div key={product._id} onClick={()=>{
                      navigate(`/accessory-product/${product._id}`)
                    }} className="flex gap-2 leading-tight mt-5 cursor-pointer font-semibold text-sm">
            <div  className=" lg:w-[90px]  xl:w-[100px]">
                <img src={product?.images[0]} alt={product?.name} className="w-full  h-full object-contain"/>
               </div>

               <div className="">
                <h2 className="text-gray-600">{product?.name}</h2>
                <div className=" items-center mt-1  gap-1">
                <span className="text-gray-500 text-sm line-through text-nowrap font-semibold">RS:{format()(product?.oldprice)}</span><p className="text-sm text-red-500 font-semibold text-nowrap">RS: {format()(product?.price)}</p></div>
               </div>
            </div>
                  )
                })
               }
            

                </div>
}
</div>

                
    </div>
    

 

    </div>

    </div>
    <div className="">
       {
  relatedProducts.length !== 0 && 
<div className="bg-white flex justify-center mb-2">
  <div className="max-w-[1350px] w-full justify-center">
  <div className="xs:px-4  px-10">
               <h1 className="font-semibold text-xl text-gray-700">All Related Products</h1>
              <div className="grid w-full gap-4 mx-auto
    xsp:grid-cols-3 
    xs:grid-cols-3
    sm:grid-cols-4 
    md:grid-cols-4 
    lg:grid-cols-5 
    xl:grid-cols-5
    2xl:grid-cols-6">
              {
                relatedProducts &&
                relatedProducts?.map((product)=>{
                  return(
                 <div  key={product._id} className="col-span-1">
                     <div onClick={()=>{
                      navigate(`/accessory-product/${product._id}`)
                    }} className=" gap-2 leading-tight mt-5 cursor-pointer font-semibold text-sm">
            <div  className=" xs:w-[70px] w-[100px] lg:w-[80px] xl:w-[140px]">
                <img src={product?.images[0]} alt={product?.name} className="w-full  h-full object-cover"/>
               </div>

               <div className="mt-1">
                <h2 className="text-gray-600 xs:text-[12px]">{product?.name}</h2>
                <div className="sm:flex items-center mt-1  gap-1">
                <span className="text-gray-500 xs:text-[12px] text-sm line-through text-nowrap font-semibold">RS:{format()(product?.oldprice)}</span><p className="text-sm text-red-500 xs:text-[12px] font-semibold text-nowrap">RS: {format()(product?.price)}</p></div>
               </div>
            </div>
                 </div>
                  )
                })
               }
              </div>
            

                </div>
  </div>
</div>
} 
    </div>

    </>
  )
}

export default AccessoryProductDetails


