import { FaCartArrowDown } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import axios from 'axios'
import Products from "./products";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import Slider from "react-slick";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import Navbar from "../components/navbar";
import { useDispatch, useSelector } from "react-redux";
import { featuredProduct, getAllAccProducts, getAllProducts, offerProducts } from "../store/feature/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import BannerSlider from "../components/Banner";
import AnimatedCard from "../components/AnimatedCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Accessory from "../components/Accessory";
import AccessoryProduct from "./AccessoryProduct";
import BASE_URL from "../../apiConfig";
const Home = () => {
let context = useContext(MyContext)
  let dispatch = useDispatch();
  let product = useSelector((state)=>state.product?.products)
  let featured = useSelector((state) => state.product?.featuredProducts);
  let navigate = useNavigate()
let [images,setImages] = useState([])
 

    const offerProduct = useSelector((state) => state.product?.offerProduct?.offers) || [];
    const accProduct = useSelector((state) => state.product?.accProduct?.products) || [];
  
      const loading = useSelector((state) => state.product.loading);
 
      // const loading = true;
 
    
      useEffect(() => {
        
          dispatch(offerProducts())
           
        }, [dispatch]);



  const allBanner = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/banner/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const banners = result?.data?.banners || [];
      const imageUrls = banners.map((img) => img?.imageUrl);
      setImages(imageUrls);
    } catch (error) {
      console.log(error); 
    }
  };

 

  
    useEffect(() => {
      dispatch(getAllProducts())
      dispatch(featuredProduct());
      dispatch(getAllAccProducts())
    
    }, [dispatch]);

  

const latestProducts = [...(product.products || [])]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 9);
useEffect(()=>{

  allBanner()
  window.scrollTo(0,0)
  // allSaleBanner()
 
},[])
  return (
   <div className="overflow-x-hidden">
   
      <div className="w-full ">
        <BannerSlider images={images}/>
      </div>
     
        <div className="flex justify-center my-10">
           <h1 className="xs:text-xl text-2xl  font-semibold">Select Brand To Shop</h1>

        </div>
        <div className="flex justify-center w-full mt-7   ">
           <div className="w-full  max-w-[1250px] ">
<div className="flex flex-wrap gap-5 xs:justify-center justify-center">
  
{
              context.allCategories &&
              context.allCategories.categories &&
              context.allCategories.categories.map((item)=>{
                return(
                  <AnimatedCard key={item._id}>

<div onClick={()=>{
                    navigate(`/brand/${item?.name}`)
                  }} key={item._id} className="group xs:w-[90px] w-[200px] cursor-pointer justify-center items-center flex flex-col ">
          <div className="xs:w-[110px] md:w-[150px] sm:w-[130px] lg:w-[160px]">
            <img src={item?.images} alt="" className="group-hover:scale-110 w-full transition-all duration-300 mix-blend-multiply " />
          </div>
          <h2 className="text-lg xs:text-[14px] sm:text-[15px] first-letter:capitalize lowercase font-semibold">{item?.name}</h2>
          <button className="xs:w-[70px] xs:text-[10px] sm:p-1  sm:w-[70px] sm:text-[10px] xs:p-1 md:w-[120px] rounded-full bg-primary mt-3 text-white font-semibold text-[14px] hover:bg-secondary md:text-[15px] md:p-2">SHOP NOW</button>
        </div>
                  </AnimatedCard>
                 
                )
              })
            }
            

</div>

        </div>
        </div>
       <br /><br />
       {
  featured?.featured?.length !== 0 ? (
    <div className="bg-[#ffb347]">
      <div className="flex justify-center w-full">
        <div className="max-w-[1250px] flex justify-between px-8 mt-8 items-center w-full">
          <h2 className="xs:text-[15px] w-full text-white text-xl font-semibold mb-2">Featured Mobiles</h2>
          <Link to={'/featured-product'}>
            <button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] py-2 text-sm hover:bg-gray-300 rounded-md">View All</button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="max-w-[1250px] p-2 flex justify-center py-8 w-full">
          {loading || !featured?.featured?.length ? (
            <div className="flex flex-wrap gap-4 justify-center">
              <LoadingSkeleton />
            </div>
          ) : (
            featured &&
            featured.featured &&
            featured.featured.length >= 5 ? (
              <Swiper
                slidesPerView={5} // Default for large screens
                spaceBetween={5}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper relative"
                breakpoints={{
                  // For screens >= 1024px (lg)
                  1024: {
                    slidesPerView: 5, // Show 5 products
                  },
                  // For screens >= 768px (md)
                  768: {
                    slidesPerView: 4, // Show 3 products
                  },
                  // For screens >= 640px (sm)
                  640: {
                    slidesPerView: 3, // Show 2 products on small screens
                  },
                  // For screens < 640px (xs)
                  0: {
                    slidesPerView:2, // Show 1 product on extra small screens
                  }
                }}
              >
                {featured &&
                  featured?.featured?.slice(0, 10).map((item, i) => (
                    <SwiperSlide key={i}>
                      {item.type === 'accessory' ? (
                        <AccessoryProduct product={item} />
                      ) : (
                        <Products product={item} />
                      )}
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <div className="w-full flex ">
                <div className="grid w-full gap-4 
    xsp:grid-cols-2 
    xs:grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5
    2xl:grid-cols-6">
                {featured &&
                  featured.featured?.map((item, i) => (
                    <div key={i} className="col-span-1">
                      <AnimatedCard key={item._id}>
                        {item.type === 'accessory' ? (
                          <AccessoryProduct product={item} />
                        ) : (
                          <Products product={item} />
                        )}
                      </AnimatedCard>
                    </div>
                  ))}
              </div>
              </div>
            )
          )
          }
        </div>
      </div>
    </div>
  ) : ''}

    
<br /><br />

{
  !loading && context?.saleBanner.length !== 0 && offerProduct.length !==0 ?
 <div>
   <Link  to={'/sale-offer'}><div  className="w-[90%] cursor-pointer flex justify-center mx-auto">
  
  <img src={context?.saleBanner[0]} alt="" />
  </div></Link>
  <br /><br />
  <div className="bg-sky-400">
  <div className="flex justify-center w-full">
    <div className=" max-w-[1250px] flex justify-between px-8 mt-8  items-center w-full">
      <h2 className="xs:text-[15px]  w-full text-white text-xl font-semibold mb-2">Offer And Deals </h2>
      <Link to={'/sale-offer'}>
        <button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] py-2 text-sm hover:bg-gray-300 rounded-md">View All</button>
      </Link>
    </div>
  </div>

  <div className="flex justify-center">
  <div className="max-w-[1250px] py-8 w-full">
  {
    loading ? ( 
      <div className="flex flex-wrap justify-center gap-4">
        <LoadingSkeleton />
      </div>
    ) : (
      <div className="px-4">
        {
          offerProduct && offerProduct.length >= 5 ? (
            <Swiper
              slidesPerView={5}
              spaceBetween={5}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Navigation]}
              className="mySwiper relative"
              breakpoints={{
                // For screens >= 1024px (lg)
                1024: {
                  slidesPerView: 5, // Show 5 products
                },
                950:{
                  slidesPerView: 4,
                },
                // For screens >= 768px (md)
                768: {
                  slidesPerView: 4, // Show 3 products
                },
                // For screens >= 640px (sm)
                640: {
                  slidesPerView: 3, // Show 2 products on small screens
                },
                // For screens < 640px (xs)
                0: {
                  slidesPerView:2, // Show 1 product on extra small screens
                }
              }}
              
            >
              {offerProduct.slice(0, 10).map((item, i) => (
                <SwiperSlide key={i}>
                  <AnimatedCard key={item._id}>
                    {
                      item.type === 'accessory' ? (
                        <AccessoryProduct product={item} />
                      ) : (
                        <Products product={item} />
                      )
                    }
                  </AnimatedCard>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="grid w-full gap-4 
        xsp:grid-cols-2 
        xs:grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        2xl:grid-cols-6  ">
              {offerProduct && offerProduct.map((item, i) => (
                <div key={i} className="col-span-1">
                  <AnimatedCard key={item._id}>
                    {
                      item.type === 'accessory' ? (
                        <AccessoryProduct product={item} />
                      ) : (
                        <Products product={item} />
                      )
                    }
                  </AnimatedCard>
                </div>
              ))}
            </div>
          )
        }
      </div>
    )
  }
</div>

  </div>
</div>
 </div>
  :""
}

<br /><br />

{loading || !accProduct.length ?(
 <div className="bg-red-400 px-4 py-4  w-full">
<div className="flex justify-between max-w-[1250px] mt-8 lg:px-8 xs:px-8  sm:px-4  items-center w-full">
          <h2 className="w-full  text-white xs:text-[15px]  text-xl font-semibold mb-2">Accesory Products</h2>
           <Link to={'/all-accessory'}><button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] px-2 py-2 text-sm hover:bg-gray-300 rounded-md">View All </button></Link>
          </div>
     <div className="flex mt-4 justify-center flex-wrap gap-4">
    <LoadingSkeleton />
  </div>
 </div>
)
:(
  accProduct.length !== 0 &&
  <div className="bg-red-400  ">
<div className="flex justify-center   w-full">
<div className="flex justify-between max-w-[1250px] mt-8 lg:px-8 xs:px-8  sm:px-4  items-center w-full">
          <h2 className="w-full xs:text-[15px] text-white  text-xl font-semibold mb-2">Accesory Products</h2>
           <Link to={'/all-accessory'}><button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] px-2 py-2 text-sm hover:bg-gray-300 rounded-md">View All </button></Link>
          </div>
</div>
        <div className=" flex justify-center flex-col items-center  py-4"  >
         
        <div className="max-w-[1250px] px-4  flex w-full   flex-wrap g">
        <div className="grid w-full gap-4 
    xsp:grid-cols-2 
    xs:grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5
    2xl:grid-cols-6"
    >
          {
          accProduct.slice(0,14).map((item,i) => (
        <div key={i} className="col-span-1 ">
            <AnimatedCard  >
          <AccessoryProduct product={item} />
        </AnimatedCard>
          
</div>
      ))
      
      
    }
          </div>
   
 
    </div>


     
    </div > 
</div>
)

}
<br /><br />
{loading ?(
 <div className="bg-yellow-300  px-4 py-4  w-full">
<div className="flex justify-between max-w-[1250px] mt-8 lg:px-8 xs:px-8  sm:px-4 items-center w-full">
          <h2 className="w-full xs:text-[15px] text-white  text-xl font-semibold mb-2">Latest Mobiles</h2>
           <Link to={'/all-products'}><button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] px-2 py-2 text-sm hover:bg-gray-300 rounded-md">View All </button></Link>
          </div>
     <div className="flex mt-4 justify-center flex-wrap gap-4">
    <LoadingSkeleton />
  </div>
 </div>
)
:(
  latestProducts.length !== 0 &&
  <div className="bg-yellow-300  ">
<div className="flex justify-center  w-full">
<div className="flex justify-between max-w-[1250px] mt-4 lg:px-8 xs:px-8 sm:px-4  items-center w-full">
          <h2 className="w-full xs:text-[15px] text-white  text-xl font-semibold mb-2">Latest Mobiles</h2>
           <Link to={'/all-products'}><button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] px-2 py-2 text-sm hover:bg-gray-300 rounded-md">View All </button></Link>
          </div>
</div>
        <div className=" flex justify-center flex-col items-center  py-4"  >
         
        <div className="max-w-[1250px] px-4 flex w-full  ">
        <div className="grid w-full gap-4 
    xsp:grid-cols-2 
    xs:grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5">
        {/* className="w-full flex flex-wrap gap-2  pl-4 " */}
        {
      latestProducts.slice(0,9).map((item,i) => (
      <div key={i} className="col-span-1">
        {/* xsp:w-[45%]  xs:w-[45%] sm:w-[30%] gap-2 */}
          <AnimatedCard key={item._id}>
          <Products product={item} />
        </AnimatedCard>
      </div>
      ))
  }
          </div>


   </div>
     
    </div > 
</div>
)

}

      
<br /><br />
{
  product?.products?.length !==0 &&
  <div className="bg-emerald-400 flex flex-col items-center justify-center">
<div className="flex justify-center lg:px-8 xs:px-4 pb-3  w-full">
<div className="flex justify-between max-w-[1250px]  mt-8 lg:px-8 sm:px-4  items-center w-full">
          <h2 className="w-full xs:text-[13px] text-white   text-xl font-semibold ">Recommend Mobiles</h2>
           <Link to={'/all-products'}><button className="text-nowrap bg-white xs:w-[80px] w-[110px] xs:p-1 xs:text-[12px] py-2 text-sm hover:bg-gray-300 rounded-md">View All</button></Link>
          </div>
</div>
 
         
     
        {loading || !product?.products?.length ? (
  <div className="flex flex-wrap justify-center gap-4 mt-6">
    <LoadingSkeleton />
  </div>
) : (
 
<div className="max-w-[1250px]  px-4 flex w-full   ">
<div className="grid w-full gap-4 
    xsp:grid-cols-2 
    xs:grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5">
  {
      product&&
  product.products &&
  product.products?.slice(0,19).map((item,i) =>{
    return(
 
      <div key={i} className="col-span-1">
      <AnimatedCard key={item._id}>
      <Products product={item} />
    </AnimatedCard>
  </div>
 
     

    )
  })
  }
</div>
</div>
 

)
}
 <Link to={'/all-products'}>
 <p className="py-5 text-white md:text-[18px] xs:text-[14px] underline">Click to view all Products</p>
 </Link>
</div>
}

      
  
   </div>
  )
}

export default Home