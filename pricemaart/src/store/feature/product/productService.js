import axios from "axios";
import BASE_URL from "../../../../apiConfig";

let getAllProd = async () => {
  try {
    let axiosResponce = await axios.get(`${BASE_URL}/products/all`, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
   
    return Promise.reject(errorMessage);
  }
};
let getProductWithCatName = async (catName) => {
  try {
    let axiosResponce = await axios.get(
      `${BASE_URL}/products/all?catName=${catName}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};
let getAllAccProd = async () => {
  try {
    let axiosResponce = await axios.get(
      `${BASE_URL}/subProduct/all`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};
let getSingleAccPorduct = async (id) => {
  try {
    let axiosResponce = await axios.get(
      `${BASE_URL}/subProduct/single/${id}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};
let getAccProductWithCatName = async (catName) => {
  try {
    let axiosResponce = await axios.get(
      `${BASE_URL}/subProduct/all?catName=${catName}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};

let getSingleProduct = async (id) => {
  try {
    let axiosResponce = await axios.get(
      `${BASE_URL}/products/single/${id}`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponce.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};
let getFeaturedProducts = async () => {
  try {
    let axiosResponse = await axios.get(
      `${BASE_URL}/products/featured`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};
let getOfferProduct = async () => {
  try {
    let axiosResponse = await axios.get(
      `${BASE_URL}/products/offer`,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return axiosResponse.data;
  } catch (error) {
    let errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong. Please try again!";
    return Promise.reject(errorMessage);
  }
};

let productsService = {
  getAllProd,
  getSingleProduct,
  getProductWithCatName,
  getFeaturedProducts,
  getOfferProduct,
  getAccProductWithCatName,
  getAllAccProd,
  getSingleAccPorduct,
};

export default productsService;
