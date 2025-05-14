import InnerZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { useRef } from "react";



const InnerZoomComp  = ({product,changeImage,setChangeImage}) => {
    let zoomSliderBig = useRef();
    let zoomSlider = useRef();
    let goto = (index) => {
        zoomSlider.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
        setChangeImage(index);
      };


     
  return (
    <>
   <div className="w-full xs:flex  justify-center xs:flex-col items-center ">
   <div className="lg:w-[340px] xsp:w-[200px] md:w-[320px] xl:w-[340px] sm:w-[270px]  xs:w-[250px]  rounded-t-2xl ">
      

   <Swiper
  slidesPerView={1}
  spaceBetween={10}
 
  modules={[Navigation]}
  ref={zoomSliderBig}
  className="mySwiper"
>
  {product?.product?.images.map((img, i) => (
    <SwiperSlide key={i}>
     <div className="w-[350px] lg:w-[300px] sm:w-[270px] xsp:w-[200px] xs:w-[250px]  xl:w-[350px] ">
     <InnerZoom
        className="rounded-t-2xl  w-full h-full object-fit"
        zoomType="hover"
        zoomScale={1}
        src={i === changeImage ? img : product.product.images[changeImage]}
      />
     </div>
    </SwiperSlide>
  ))}
</Swiper>
            
             
   <div className="xs:hidden  mt-2 innerZoomArrow">
   <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        
        
        modules={[Navigation]}
        className="mySwiper sm:w-[280px] md:w-[300px] sm:h-[80px] h-[110px] "
        ref={zoomSlider}
      >
        {/* <SwiperSlide></SwiperSlide> */}
        {
           product && product.product &&
           product.product.images.map((img,i)=>{
            return(
              <SwiperSlide  key={i}> <div className="cursor-pointer scale-95 sm:h-[60px] md:h-[70px]
               rounded-md  border hover:border-green-600 border-gray-600">
                  <img
                    onClick={() => goto(i)}
                    className="rounded-md  object-fill w-full h-full"
                    src={img}
                    alt=""
                   
                    
                  />
                </div></SwiperSlide>
            )
           })
        }
        
      
        
      
      </Swiper>
   </div>
  

            
            </div>
            <div className=" sm:hidden xs:grid xs:grid-cols-4  mx-auto justify-center flex-wrap gap-2 ">
   {
           product && product.product &&
           product.product.images.map((img,i)=>{
            return(
              <div  key={i}> <div className="cursor-pointer col-span-1 scale-95 xs:h-[60px]
               rounded-md  border hover:border-green-600 border-gray-600">
                  <img
                    onClick={() => goto(i)}
                    className="rounded-md  object-fill w-full h-full"
                    src={img}
                    alt=""
                   
                    
                  />
                </div></div>
            )
           })
        }
   </div>
   </div>
    </>
  )
}

export default InnerZoomComp