import { useContext, useEffect, useState } from "react";

import { featuredProduct, getAllProducts, offerProducts } from "../store/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import axios from "axios";
import BannerSlider from "../components/Banner";
import { MyContext } from "../App";
import AccessoryProduct from "./AccessoryProduct";
import AllProductPage from "../components/AllProductsPage";
import BASE_URL from "../../apiConfig";

const FeaturedProducts = () => {


    const [loading, setLoading] = useState(false);
let [images,setImages] = useState([])

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product?.featuredProducts?.featured) || [];
    useEffect(() => {
        setLoading(true);
        dispatch(featuredProduct())
          .finally(() => {
            setLoading(false);
          });
      }, [dispatch]);
         let allCategory = async ()=>{
            
          
            try {
                let result = await axios.get(`${BASE_URL}/category/all`,{
                     headers: {
                      "Content-Type": "multipart/form-data",
                    },
                })
          
          
               console.log(result)
               const banners = result?.data?.categories?.filter((cat) => cat?.banner) || [];
                     const imageUrls = banners.map((img) => img?.banner);
                     setImages(imageUrls);
            } catch (error) {
                console.log(error)
             
          
          
            }
          }
useEffect(()=>{
    allCategory()
},[])
   
    return (
        <div>
            <div>
                        <div className="w-full ">
                    <BannerSlider images={images}/>
                  </div>
                        </div>
      <div>
        <AllProductPage loading={loading} product={product}/>
      </div>
        </div>
       
    );
};

export default FeaturedProducts;