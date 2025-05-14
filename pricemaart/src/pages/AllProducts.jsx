import { useEffect, useState } from "react";

import { getAllProducts } from "../store/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import axios from "axios";
import BannerSlider from "../components/Banner";
import AllProductPage from "../components/AllProductsPage";
import BASE_URL from "../../apiConfig";

const AllProducts = () => {


    const [loading, setLoading] = useState(false);

    const [images, setImages] = useState([]);
    
    
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product?.products?.products) || [];
    console.log(product)
    // const loading = useSelector((state) => state.product.loading);
  
    useEffect(() => {
        setLoading(true);
        dispatch(getAllProducts())
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
        <div className="">
               
            <div>
            <div className="w-full ">
        <BannerSlider images={images}/>
      </div>
            </div>
          <div className="">
            <AllProductPage loading={loading} product={product}/>
          </div>
        </div>
       
    );
};

export default AllProducts;