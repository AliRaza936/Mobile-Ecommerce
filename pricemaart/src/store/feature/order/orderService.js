import axios from "axios";
import BASE_URL from "../../../../apiConfig";


let createOrder = async ({inputs,userId}) => {

try {
  let axiosResponce = await axios
  .post(`${BASE_URL}/orders/create/${userId}`, inputs, {
   
        
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  })
  return axiosResponce.data
} catch (error) {
  let errorMessage  = error?.response?.data?.message ||error.message || "Something went wrong. Please try again!"
  return Promise.reject(errorMessage)
}  
};


let orderService = {createOrder}

export default orderService