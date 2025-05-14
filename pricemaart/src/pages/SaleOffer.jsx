import { useContext, useEffect, useState } from "react";

import { getAllProducts, offerProducts } from "../store/feature/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Products from "./products";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


import axios from "axios";
import BannerSlider from "../components/Banner";
import { MyContext } from "../App";
import AccessoryProduct from "./AccessoryProduct";
import AllProductPage from "../components/AllProductsPage";

const SaleOffer = () => {



    const [loading, setLoading] = useState(false);

let context = useContext(MyContext)

    const dispatch = useDispatch();
    const product = useSelector((state) => state.product?.offerProduct?.offers) || [];
    useEffect(() => {
        setLoading(true);
        dispatch(offerProducts())
          .finally(() => {
            setLoading(false);
          });
      }, [dispatch]);

  
  useEffect(()=>{
   
    window.scrollTo(0,0)
  },[])

   
    return (
        <div>
               
            <div>
            <div className="w-full ">
        <BannerSlider images={context?.saleBanner}/>
      </div>
            </div>
            <div>
                <AllProductPage product={product} loading={loading}/>
            </div>
            
        </div>
       
    );
};

export default SaleOffer;