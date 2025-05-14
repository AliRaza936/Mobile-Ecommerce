
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductItems from "../components/ProductItems";
import "swiper/swiper-bundle.css";
import propsType from 'prop-types'



const RelatedProduct = (props) => {
// console.log('relatedDtadta',props?.relatedProducts)
  return (
    <div className="w-[90%] mx-auto mt-5 ">
    <div>
        <h2 className="mb-2 text-lg font-semibold">{props.title}</h2>
    </div>
 <div className="flex w-[100%]  ">
  {
    props?.relatedProducts?.length < 6 ? <div className="flex gap-2">
         {
                  props?.relatedProducts &&
                  props?.relatedProducts.length!==0 &&
                  props?.relatedProducts?.map((product)=>{
                    return(
                     
                  <ProductItems key={product._id} product={product} />
               
                    )
                  })
                }
    </div>
    :
    <Swiper
                slidesPerView={5.2}
                spaceBetween={5}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                // slidesPerGroup={3}
                modules={[Navigation]}
                className="mySwiper"
              >
                {
                  props?.relatedProducts &&
                  props?.relatedProducts.length!==0 &&
                  props?.relatedProducts?.map((product)=>{
                    return(
                      <SwiperSlide key={product._id}>
                  <ProductItems product={product} />
                </SwiperSlide>
                    )
                  })
                }
                
            
              </Swiper>
  }
    
              
            </div>
    </div>
  )

}
RelatedProduct.propTypes={
    title:propsType.string.isRequired,
}

export default RelatedProduct