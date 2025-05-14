import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import AllProductPage from "../components/AllProductsPage";
import BASE_URL from "../../apiConfig";

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("q"); // ✅ Extract search query

    const [loading, setLoading] = useState(false);

    let [product,setProduct] = useState([])

  
    let fetchProducts = async (searchQuery)=>{
        if (!searchQuery) {
            setProduct([]);
            return;
          }
    
        try {
            let result = await axios.get(`${BASE_URL}/search/combined?q=${searchQuery}`,{
                 headers: {
                  "Content-Type": "multipart/form-data",
                },
            })
        console.log(result.data?.results)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setProduct(result?.data.results);
        }, 1000);

        } catch (error) {
            console.log(error)

        }
      }
    
useEffect(()=>{
    fetchProducts(query)
},[query])


useEffect(()=>{
    window.scrollTo(0,0)
},[])

    return (
       <div>
        <div>
            <AllProductPage loading={loading} product={product}/>
        </div>
       </div>
    );
};

export default SearchPage;
