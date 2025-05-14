import InnerZoom from "react-inner-image-zoom";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import { useRef } from "react";



const InnerZoomComp  = () => {
    let zoomSliderBig = useRef();
    let zoomSlider = useRef();
    let goto = (index) => {
        zoomSlider.current.swiper.slideTo(index);
        zoomSliderBig.current.swiper.slideTo(index);
      };
  return (
    <>
    <div className="w-[320px]  rounded-t-2xl ">
            <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
        ref={zoomSliderBig}
      >
        <SwiperSlide> <div className=" rounded-t-xl">
                  <InnerZoom
                    className="rounded-t-2xl"
                    zoomType="hover"
                    zoomScale={1}
                    src="https://api.spicezgold.com/download/file_1734526007829_hp-15-fc0154au-laptop-amd-ryzen-3-7320u-8gb-ddr5-5500-sdram-512gb-ssd-amd-radeon-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-natural-silver-1-59-kgs-1080p-web-cam-digital-o494352995-p608658148-0-20240402160.webp"
                  />
                </div></SwiperSlide>
        <SwiperSlide><div>
                  <InnerZoom
                    zoomType="hover"
                    className="rounded-t-2xl"
                    zoomScale={1}
                    src="https://api.spicezgold.com/download/file_1734526007829_hp-15-fc0154au-laptop-amd-ryzen-3-7320u-8gb-ddr5-5500-sdram-512gb-ssd-amd-radeon-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-natural-silver-1-59-kgs-1080p-web-cam-digital-o494352995-p608658148-0-20240402160.webp"
                  />
                </div></SwiperSlide>
        
        
      </Swiper>
             
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
        ref={zoomSlider}
      >
        <SwiperSlide></SwiperSlide>
        <SwiperSlide> <div className="cursor-pointer   rounded-md border hover:border-green-600 border-gray-600">
                  <img
                    onClick={() => goto(0)}
                    className="rounded-md"
                    src="https://api.spicezgold.com/download/file_1734526007829_hp-15-fc0154au-laptop-amd-ryzen-3-7320u-8gb-ddr5-5500-sdram-512gb-ssd-amd-radeon-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-natural-silver-1-59-kgs-1080p-web-cam-digital-o494352995-p608658148-0-20240402160.webp"
                    alt=""
                    width={100}
                  />
                </div></SwiperSlide>
        <SwiperSlide> <div className="cursor-pointer   rounded-md border hover:border-green-600 border-gray-600">
                  <img
                    onClick={() => goto(1)}
                    className="rounded-md"
                    src="https://api.spicezgold.com/download/file_1734526007829_hp-15-fc0154au-laptop-amd-ryzen-3-7320u-8gb-ddr5-5500-sdram-512gb-ssd-amd-radeon-graphics-windows-11-mso-fhd-39-6-cm-15-6-inch-natural-silver-1-59-kgs-1080p-web-cam-digital-o494352995-p608658148-0-20240402160.webp"
                  />
                </div></SwiperSlide>
        
      
      </Swiper>

            
            </div>
    </>
  )
}

export default InnerZoomComp