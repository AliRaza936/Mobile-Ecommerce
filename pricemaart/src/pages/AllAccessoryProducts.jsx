  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { getAllAccProducts, } from "../store/feature/product/productSlice";
  import { useDispatch, useSelector } from "react-redux";


  import AllAccessoryProduct from "../components/AccesoryProductPage";
  import axios from "axios";
import BannerSlider from "../components/Banner";
import BASE_URL from "../../apiConfig";

  const AllAccessoryProducts = () => {
      let { name } = useParams();

      const [loading, setLoading] = useState(false);




      const dispatch = useDispatch();
      const product = useSelector((state) => state.product?.accProduct?.products) || [];
      // const loading = useSelector((state) => state.product.loading);
      let [images,setimages] = useState([])
    
      useEffect(() => {
          setLoading(true);
          dispatch(getAllAccProducts()).finally(() => {
            setLoading(false);
          });
        }, [name, dispatch]);

    

    
    
        let singleCategory = async ()=>{
        
      
        
        try {
            let result = await axios.get(`${BASE_URL}/accessory/all`,{
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
      
      console.log('lanfa ',result)
      const banners = result?.data?.accessories?.filter((cat) => cat?.banner) || [];
      const imageUrls = banners.map((img) => img?.banner);
      setimages(imageUrls);

        } catch (error) {
            console.log(error)
        
      
      
        }
      }

  useEffect(()=>{
      singleCategory()
  },[])

      useEffect(()=>{
          window.scrollTo(0,0)
      },[])

      return (
          <div>
                  <div>
            <div className="w-full ">
        <BannerSlider images={images}/>
      </div>
            </div>
            <AllAccessoryProduct product={product} loading={loading} />
          </div>
        
      );
  };

  export default AllAccessoryProducts;