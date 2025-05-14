import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAccCatProduct, getAllProducts, getCatProduct } from "../store/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import axios from "axios";
import AllAccessoryProduct from "../components/AccesoryProductPage";
import BASE_URL from "../../apiConfig";

const SingleAccessorypage = () => {
    let { name } = useParams();
    const encodedName = encodeURIComponent(name);
    const [loading, setLoading] = useState(false);

    let [bannerImage,setBannerImage] = useState('')
   

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product?.accProduct?.products || state.product?.products?.products) || [];
    // const loading = useSelector((state) => state.product.loading);
    useEffect(() => {
        // Reset the products before fetching new data
        dispatch({ type: 'products/resetProducts' });
    
        setLoading(true);
    
        // Fetch products based on the category
        if (name === "smartphone") {
          dispatch(getAllProducts()).finally(() => setLoading(false));
        } else {
          dispatch(getAccCatProduct(encodedName)).finally(() => setLoading(false));
        }
      }, [encodedName, dispatch, name]);
    

  
    let singleCategory = async ()=>{
      
        const encodedName = encodeURIComponent(name);
      
      try {
          let result = await axios.get(`${BASE_URL}/accessory/single?name=${encodedName}`,{
               headers: {
                "Content-Type": "multipart/form-data",
              },
          })
    
    console.log(result)
         
    setBannerImage(result?.data?.accessory?.banner)
      } catch (error) {
          console.log(error)
       
    
    
      }
    }

useEffect(()=>{
    singleCategory()
},[encodedName])


 
    return (
        <div>
               
            <div>
                <div>
                    <img src={bannerImage}  className="w-full h-full "/>
                </div>
            </div>
        <div>
            <AllAccessoryProduct loading={loading} product={product}/> 
        </div>
        </div>
       
    );
};

export default SingleAccessorypage;