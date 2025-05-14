import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef, useState } from "react";
import InnerZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { MdBrandingWatermark, MdOutlineRateReview } from "react-icons/md";

import Rating from "@mui/material/Rating";
import { RiFolderUploadFill } from "react-icons/ri";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoSettingsSharp } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import moment from 'moment'
import BASE_URL from "../../apiConfig";
const AccessoryProductDetails = () => {

  let { id } = useParams()
  let [reviewData,setReviewData] = useState({})

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  let bigImage = useRef(null);
  let smallImage = useRef(null);
  const gotoIndex = (index) => {
    if (bigImage.current && bigImage.current.slickGoTo) {
      bigImage.current.slickGoTo(index);
    }
  
    if (smallImage.current && smallImage.current.slickGoTo) {
      smallImage.current.slickGoTo(index);
    }
  };
  let [productData, setProductData] = useState([])

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
   
      setReviewData(result.data)
    
    } catch (error) {
      console.log(error)
    }

    }

  let getSingleProduct = async (id) => {
    try {
      let result = await axios.get(`${BASE_URL}/subProduct/single/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
     
      setProductData(result?.data?.product)
  
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    // window.scrollTo(0,0)
    getSingleProduct(id)
    allReviews()
    // console.log(productData,'prod')
  }, [id])

  
  return (
 <div className="p-5">
     <div className="p-6 bg-white rounded-md ">
     <div className="p-6 ">
            <div className="flex xs:flex-col  xs:items-center sm:items-center md:items-start md:justify-between  sm:flex-col md:flex-row gap-6 ">
              <div className="">
                <h3 className="text-xl font-semibold text-gray-800 mb-5">
                  Product Gallery
                </h3>
                <Slider
                  className="lg:w-[350px] max-h-[360px] md:w-[300px] xs:w-[250px] xsp:w-[200px] sm:w-[300px] rounded-md overflow-hidden "
                  ref={bigImage}
                  {...settings}
                >{
                  productData.images &&
                  productData.images.map((img,i)=>{
                    return(
                       <div key={i} className="outline-none">
                    <InnerZoom
                      className="rounded-t-2xl "
                      zoomType="hover"
                      zoomScale={1}
                      src={img}
                    />
                  </div>
                    )
                  })
                }
                 
                  
                </Slider>
                <div
                  className="max-w-[450px] xs:w-[250px]  mt-2 rounded-md overflow-hidden gap-3 flex flex-wrap"
                  ref={smallImage}
               
                >
                  {
                    productData.images &&
                    productData.images.map((img,i)=>{
                      return(
                         <div key={i} className="outline-none rounded-lg ">
                    <img
                      onClick={() => gotoIndex(i)}
                      className="border rounded-lg p-1 cursor-pointer border-green-400 "
                      width={70}
                      src={img}
                      alt=""
                    />
                  </div>
                      )
                    })
                  }
                 
                 
                </div>
              </div>
    
              <div className="w-full xs:flex  xs:flex-col xs:items-start">
                <h2 className="text-xl mb-4 text-gray-800 font-semibold">
                  Product Details
                </h2>
                  <h2 className="text-2xl text-gray-800 font-semibold">
                    {productData?.name}
                  </h2>
         
                 
               

                    <div className="flex text-gray-700 items-center gap-4 mt-2 ">
                      <p className="flex items-center  text-gray-600 w-[120px] font-semibold  gap-2">
                        <BiSolidCategoryAlt  className="text-2xl mt-1" />
                        Category
                      </p>
    
                      <div className="flex items-center gap-5 ">
                      <p className="font-semibold text-xl">:</p>
                        <span className="text-lg lowercase first-letter:capitalize  xsp:text-[15px]">{productData?.catName}</span>
                      </div>
                    </div>

               


<div className="flex text-gray-700 items-center gap-4 mt-2 ">
                      <p className="flex items-center  text-gray-600 w-[120px] font-semibold  gap-2">
                        <BiSolidCategoryAlt  className="text-2xl mt-1" />
                        Colors
                      </p>
    
                      <div className="flex items-center space-x-3 ">
                      <p className="font-semibold text-xl">:</p>
                        
                        
                    {
       productData &&
       productData.phoneSpecs && 
       productData.phoneSpecs.color && 
       productData.phoneSpecs.color.map((col,i)=>{
          return(
            <div key={i}  className={`w-[25px] h-[25px] bg-red-500  shadow-sm shadow-gray-400  rounded-full `} style={{backgroundColor:`${col}`}}></div>
          )
        }) 

      }

                      </div>
                    </div>


                    <div className="flex text-gray-700 items-center gap-4  mt-2 ">
                      <p className="flex items-center  w-[120px] text-gray-600  font-semibold  gap-2">
                        <MdOutlineRateReview className="text-2xl  mt-1" />
                        Review
                      </p>
    
                      <div className="flex items-center gap-5 ">
                      <p className="font-semibold text-2xl">:</p>
                        <span className="text-lg  xsp:text-[15px]">({reviewData?.reviews?.length})Review</span>
                      </div>
                    </div>
                    <div className="flex text-gray-700 items-center  gap-4 mt-2 ">
                      <p className="flex items-center text-gray-600 w-[120px]  font-semibold  gap-2">
                        <RiFolderUploadFill className="text-2xl mt-1" />
                        Published
                      </p>
    
                      <div className="flex items-center gap-5 ">
                      <p className="font-semibold text-2xl">:</p>
                        <span className="text-lg  xsp:text-[15px]">{moment(productData?.createdAt).format('DD/MM/YYYY')}</span>
                      </div>
                    </div>
                   
                 
                   
                 
              
        
              </div>
            </div>
            <div className="mt-5">
              <div>
                <h2 className="text-xl  xsp:text-[18px] font-semibold text-gray-800">
                  Product Description
                </h2>
                <p className="mt-2 text-gray-9">
                 {productData?.description}
                </p>
              </div>
             
    
    
            </div>
            
          </div>

            <div className=" w-full">
  <h2 className="text-center text-2xl font-semibold mb-4">Specs</h2>
  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th rowSpan={2} className="border border-gray-300 p-3 text-left py-5 text-[14px]">WEIGHT:</th>
       
      </tr>
      <tr>
  
        <td className="border border-gray-300 p-3  font-medium text-[14px]">{productData?.phoneSpecs?.weight ||"NA"} </td>
      </tr>
    </thead>
    <tbody>
      <tr className="">
        <th className="border border-gray-300 p-3 py-5 text-left text-[14px]">MATERIAL :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]">
            {productData?.phoneSpecs?.material || "NA"}
        </td>
      </tr>
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">WATER RESISTANCE :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]"> {productData?.phoneSpecs?.waterResistance || 'NA'}</td>
      </tr>
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">CONNECTIVITY TYPE :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]"> {productData?.phoneSpecs?.connectivity || 'NA'}</td>
      </tr>
     
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">BATTERY :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]" > {productData?.phoneSpecs?.batteryCapacity ||'NA'}</td>
      </tr>
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">CHARGING TIME :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]"> {productData?.phoneSpecs?.chargingTime || 'NA'}</td>
      </tr>
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">BACKUP TIME :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]"> {productData?.phoneSpecs?.backupTime||"NA"}</td>
      </tr>
      <tr>
        <th className="border border-gray-300 p-3 text-left py-5 text-[14px]">WARRANTY :</th>
        <td colSpan="2" className="border border-gray-300 p-3 font-medium text-[14px]"> {productData?.phoneSpecs?.warranty||'NA'}</td>
      </tr>
    </tbody>
  </table>
</div>



      <div className="mt-7">
        {
          reviewData?.reviews?.length !== 0 &&
            <h2 className="text-xl font-semibold text-gray-800">
              Product Reviews
            </h2>
        }
            {
              reviewData &&
              reviewData.reviews &&
              reviewData.reviews?.slice(0)?.reverse()?.map((review)=>{
                return(
                   <div key={review._id} className="w-full">
              <div className="w-full flex justify-between items-start p-4 bg-gray-200 mt-3 rounded-lg">
                <div>
                  <div className="flex gap-4">
                  <div className="flex ">
                         <div className="border-2 p-[2px] rounded-full border-green-500">
                   <div className="bg-green-400 rounded-full w-[60px] h-[60px] overflow-hidden flex justify-center items-center">
                       {/* <img src={img1} className="w-full h-full object-cover "  />   */}
                       <span  className='uppercase text-white text-lg  font-semibold'>{
                        review?.userId.email.charAt(0)
                        }</span>
                    </div>
                   </div>
                    </div>
                    <div className="leading-[15px]">
                      <h2 className="text-lg first-letter:capitalize">{review?.userId.name}</h2>
                      <p  className="text-gray-700">{moment(review?.createdAt).fromNow()}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Rating
                      name="read-only"
                      value={review?.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                  </div>
                  <div>
                   {review?.review}
                  </div>
                </div>
                
              </div>
            </div>
                )
              })
            }
           
           
          </div>
          <br /> <br />
   
    </div>
 </div>
  );
};

export default AccessoryProductDetails;
