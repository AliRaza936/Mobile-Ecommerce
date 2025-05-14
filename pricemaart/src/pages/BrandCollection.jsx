import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatProduct } from "../store/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import axios from "axios";
import AllProductPage from "../components/AllProductsPage";
import BASE_URL from "../../apiConfig";

const BrandCollection = () => {
    let { name } = useParams();

    const [loading, setLoading] = useState(false); 
    let [bannerImage,setBannerImage] = useState('')



    const dispatch = useDispatch();
    const product = useSelector((state) => state.product?.products?.products) || [];

  
    useEffect(() => {
        setLoading(true);
        dispatch(getCatProduct(name)).finally(() => {
          setLoading(false);
        });
      }, [name, dispatch]);


      
    let singleCategory = async ()=>{
      
    
      try {
          let result = await axios.get(`${BASE_URL}/category/single?name=${name}`,{
               headers: {
                "Content-Type": "multipart/form-data",
              },
          })
    
    
         
    setBannerImage(result?.data?.category?.banner)
      } catch (error) {
          console.log(error)
       
    
    
      }
    }

useEffect(()=>{
    singleCategory()
},[name])


    return (
        <div>
               
            <div>
                <div>
                    <img src={bannerImage}  className="w-full h-full "/>
                </div>
            </div>
            <div>
                <AllProductPage loading={loading} product={product}/>
            </div>
        </div>
       
    );
};

export default BrandCollection;