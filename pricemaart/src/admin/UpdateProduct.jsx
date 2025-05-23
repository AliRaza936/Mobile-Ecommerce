
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Alert, Button, Chip, CircularProgress, Snackbar } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { FaCloudUploadAlt, FaRegImages } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import { MyContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import SelectColor from "react-select";
import BASE_URL from "../../apiConfig";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
            color: "#5fd90d",
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});
const UpdateProduct = () => {
    let [categoryChange, setCategoryChange] = useState('');
        let [imagesToRemove,setImagesToRemove] = useState([])
          
        
    const [open, setOpen] = React.useState({ open: false, message: '', severity: '' });

    let [inputForm, setInputForm] = useState({
        name: "",
        description: "",
        category: '',
        // brand: "",
        price: 0,
        oldprice: 0,
        catName:'',
        // subCatName:'',
        isFeatured: false,
        countInStock: "",
        // rating: 1,
        // subCategory:'',
        // subCatId:'',
        discount: 0,
        productRAM: '',
        // productSIZE: [],
        // productWEIGHT: [],
        images: [],

        displaySize: "",       // ✅ New Field
        batteryCapacity: "",   // ✅ New Field
        camera: "",            // ✅ New Field
        processor: "",         // ✅ New Field
         // ✅ New Field
        storage: "",           // ✅ New Field
             // ✅ New Field
        color: [],             // ✅ New Field
                  // ✅ New Field
        offer: false, 
    });
    let context = useContext(MyContext)

    let [productImagesArr, setProductImagesArr] = useState([]);


    let [offerChange, setOfferChange] = useState(false);

    let navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false);
    let [allCategories, setAllCategories] = useState({});

     let [ramChange, setRamChange] = useState('');
        // let [weightChange, setWeightChange] = useState([]);
        // let [sizeChange, setSizeChange] = useState([]);
        // let [allWeight, setAllWeight] = useState({});
        // let [allSize, setAllSize] = useState({});
        let [allRams, setAllRams] = useState({});

        const colorOptions = [
            { value: "Black", label: "Black" },
            { value: "White", label: "White" },
            { value: "Red", label: "Red" },
            { value: "Blue", label: "Blue" },
            { value: "Green", label: "Green" },
            { value: "Yellow", label: "Yellow" },
            { value: "Purple", label: "Purple" },
            { value: "Gold", label: "Gold" },
            { value: "Brown", label: "Brown" },
            { value: "Gray", label: "Gray" },
            { value: "Silver", label: "Silver" },
            { value: "Pink", label: "Pink" },
            { value: "Orange", label: "Orange" },
            { value: "Olive", label: "Olive" },
            { value: "Teal", label: "Teal" },
            { value: "Navy", label: "Navy" },
            { value: "Aqua", label: "Aqua" },
            { value: "Lime", label: "Lime" },
            { value: "Maroon", label: "Maroon" },
            { value: "Cyan", label: "Cyan" }
          ];
          


          let hanldeOffer = (e) => {
            setOfferChange(e.target.value);
            setInputForm(() => ({
                ...inputForm,
                offer: e.target.value,
            }));
        };

    let handleCategoryChange = (e) => {

        setCategoryChange(e.target.value)

       
        setInputForm(() => ({
            ...inputForm,
            category: e.target.value,
        }));
    };
    const handleRamChange = (e) => {
        const selectedRamName = e.target.value;
      
        setRamChange(selectedRamName);
      
        setInputForm((prev) => ({
          ...prev,
          productRAM: selectedRamName, // store RAM name
        }));
      };
    // let handleSizeChange = (e) => {
    //     setSizeChange(e.target.value);

    //     setInputForm(() => ({
    //         ...inputForm,
    //         productSIZE: e.target.value,
    //     }));
       


    // };
    // let handleWeightChange = (e) => {
    //     setWeightChange(e.target.value);

    //     setInputForm(() => ({
    //         ...inputForm,
    //         productWEIGHT: e.target.value,
    //     }));
    // };

    // let allWeights = async () => {
    //     try {
    //         let result = await axios.get(`${BASE_URL}/product/productWeight/all`, {
    //             withCredentials: true,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         setAllWeight(result?.data)


    //     } catch (error) {
    //         console.log(error)
    //         setOpen({ open: true, message: error.response.data.message, severity: 'error' })
    //     }
    // }
    // let allSizes = async () => {
    //     try {
    //         let result = await axios.get(`${BASE_URL}/product/productSize/all`, {
    //             withCredentials: true,
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         })
    //         setAllSize(result?.data)


    //     } catch (error) {
    //         console.log(error)
    //         setOpen({ open: true, message: error.response.data.message, severity: 'error' })
    //     }
    // }

    let allRAMS = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/product/productRam/all`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            })
            setAllRams(result?.data)


        } catch (error) {
            console.log(error)
            setOpen({ open: true, message: error.response.data.message, severity: 'error' })
        }
    }





    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    let handleIsFeaturedChange = (e) => {

        setInputForm(() => ({
            ...inputForm,
            isFeatured: e.target.value,
        }));
    };

    let { id } = useParams()

    const handleRemoveImage = (index) => {
        
        let imageUrl = productImagesArr[index]
        setImagesToRemove((pre)=>[...pre,imageUrl])
        setProductImagesArr((preImages) => preImages.filter((_, i) => i !== index));

        setInputForm((preInputForm)=>({
            ...preInputForm,
            images:preInputForm.images.filter((_,i)=>i !== index)
        }))   
        document.getElementById("inputFile").value = [];
    };

  
    let hanldeFileChanges = (e) => {
        if (e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            let allowedFormat = ['jpg', 'jpeg', 'png', 'gif', 'bmp','webp']
            let validFiles = []
           
               
                files.forEach((file) => {
                    let fileFormat = file.name.split('.').pop().toLowerCase()
                    if (allowedFormat.includes(fileFormat)) {
                        validFiles.push(file)
                    } else {
                        setOpen({ open: true, message: 'Invalid file format.', severity: 'error' })
                    }})
                    inputForm.images = [...inputForm.images, ...validFiles];
                    setInputForm({ ...inputForm });
                    validFiles.forEach((file)=>{
                        let reader = new FileReader();
    
                reader.onloadend = () => {
                    let imageData = reader.result;
    
    
                    setProductImagesArr((preImages) => [...preImages, imageData]);
                };
                reader.readAsDataURL(file);
                    })
                
         
           
        }
    }
    let handleChange = (e) => {
        setInputForm(() => ({
            ...inputForm,
            [e.target.name]: e.target.value,
        }));
    };
    let allCategory = async () => {
        try {
            let result = await axios.get(`${BASE_URL}/category/all`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setAllCategories(result.data);
        } catch (error) {
            console.log(error);
        }
    };
    let getSingleProduct = async (id) => {
        try {
            let result = await axios.get(`${BASE_URL}/products/single/${id}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                
            console.log(result)
            let res = result.data?.product
            let specs = res.phoneSpecs
            console.log(specs)
            setInputForm({
                name: res?.name,
                description: res.description,
                category: res.category?._id,
                // brand: res.brand,
                price: res.price,
                oldprice: res.oldprice,
                isFeatured: res.isFeatured,
                countInStock: res.countInStock,
                rating: res.rating,
                images: res.images,
             
                discount:res.discount,
                productRAM: res.productRAM,
                
                // productWEIGHT: res.productWEIGHT.map((weight) => weight._id.toString()),
                // productSIZE: res.productSIZE.map((size) => size._id.toString()),
                catName: res.category.name, // Update catName field
                
                displaySize:specs?.displaySize.trim(),
                batteryCapacity:specs?.batteryCapacity.trim(),
                processor:specs?.processor.trim(),
                storage:specs?.storage.trim(),
                camera:specs?.camera.trim(),
                color: specs?.color,
                offer:res?.offer
              
            })

            
            setOfferChange(res.offer)
        
            setCategoryChange(res.category._id)
           
            setRamChange(res.productRAM)
            // setWeightChange(res.productWEIGHT.map((weight) => weight._id.toString()))
            // setSizeChange(res.productSIZE.map((size) => size._id.toString()))

            setProductImagesArr(res.images)
           
        

        }
        catch (error) {
            console.log(error)
        }
    }
    let selectCatname = (cat)=>{
        inputForm.catName = cat
    }
   
    let handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", inputForm.name);
        formData.append("description", inputForm.description);
        formData.append("category", inputForm.category);
        formData.append("catName", inputForm.catName);
     
        // formData.append("brand", inputForm.brand);
        formData.append("price", inputForm.price);
        formData.append("oldprice", inputForm.oldprice);
        formData.append("isFeatured", inputForm.isFeatured);
        formData.append("countInStock", inputForm.countInStock);
        formData.append("rating", inputForm.rating);
        formData.append("discount", inputForm.discount);
        formData.append("productRAM", inputForm.productRAM);
        formData.append("displaySize", inputForm.displaySize);
        formData.append("batteryCapacity", inputForm.batteryCapacity);
        formData.append("camera", inputForm.camera);
        formData.append("processor", inputForm.processor);
        formData.append("storage", inputForm.storage);
        formData.append("offer", inputForm.offer);
        
        if (inputForm.color.length > 0) {
            inputForm.color.forEach((col) => {
              formData.append("color", col);
            });
          }
        // formData.append("productWEIGHT", inputForm.productWEIGHT);
        // formData.append("productSIZE", inputForm.productSIZE);
console.log(inputForm)


        inputForm.images.forEach((image,) => {
            formData.append(`images`, image);
        });
        imagesToRemove.forEach((imgUrl)=>{
            formData.append('imagesToRemove',imgUrl)
        })
        if (inputForm.name === '') {
            setOpen({ open: true, message: 'please add product name', severity: 'error' })
            return
        }
        if (inputForm.description === '') {
            setOpen({ open: true, message: 'please add product description', severity: 'error' })
            return
        }
        if (inputForm.category === '') {
            setOpen({ open: true, message: 'please select product category', severity: 'error' })
            return
        }
      

        if (inputForm.price == 0 || inputForm.price === '') {
            setOpen({ open: true, message: 'please add product price', severity: 'error' })
            return
        }
        if (inputForm.oldprice == 0 || inputForm.oldprice === '') {
            setOpen({ open: true, message: 'please add product old price', severity: 'error' })
            return
        }
        if (inputForm.countInStock === '') {
            setOpen({ open: true, message: 'please add product stock', severity: 'error' })
            return
        }
        // if (inputForm.discount === 0 || inputForm.discount==='') {
        //     setOpen({ open: true, message: 'please add discount', severity: 'error' })
        //     return
        // }
        // if (inputForm.rating === 0 || inputForm.rating === null ) {
        //     setOpen({ open: true, message: 'please select rating', severity: 'error' })
        //     return
        // }
        
        if (inputForm.images.length === 0) {
            setOpen({ open: true, message: 'please add images', severity: 'error' })
            return
        }
         if (context.role !== 'admin') {
    // If the role is not admin, show an alert
            setOpen({open:true,message: 'Only admin can use this resource',severity:'error'})

    return ; // Optionally return null to prevent rendering the resource
  }
        setIsLoading(true);
        context.setProgress(30)
        try {


            let result = await axios.put(
                `${BASE_URL}/products/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIsLoading(false);
            setOpen({ open: true, message: result?.data?.message, severity: 'success' })
            context.setProgress(100)

            setTimeout(() => {
                context.setProgress(100)
                navigate("/admin/product-list")
            }, 1000)


        } catch (error) {

            setIsLoading(false);
            context.setProgress(100)

            setOpen({ open: true, message: error.response.data.message, severity: 'error' })

        }
    };
  
    useEffect(() => {
        allCategory();
        // allSubCategories()
        // console.log(productData)
        allRAMS()
        // allWeights()
        // allSizes()
        getSingleProduct(id)
        window.scrollTo(0, 0)
    }, [id]);


    return (
        <div className="p-4 ">
            <div className="w-full flex flex-col sm:flex-row justify-between gap-3 sm:items-center p-5 rounded-lg bg-white">
  <div>
    <h3 className="text-base sm:text-xl font-semibold">Product Edit</h3>
  </div>
  <div role="presentation">
    <Breadcrumbs aria-label="breadcrumb" className="text-sm sm:text-base">
      <StyledBreadcrumb
        sx={{ cursor: "default" }}
        component="a"
        href="#"
        label="Dashboard"
      />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Products" />
      <StyledBreadcrumb sx={{ cursor: "default" }} label="Product edit" />
    </Breadcrumbs>
  </div>
</div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="p-6 bg-white mt-4 rounded-md">
                    <div>
                        <h3 className="text-[22px] font-semibold   text-gray-800">
                            Basic Information
                        </h3>

                        <div className="mt-3">
                            <div>
                                <label className="font-semibold text-[13px]  text-gray-800" htmlFor="name">
                                    PRODUCT NAME
                                </label>
                                <br />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter product name"
                                    className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                    name="name"
                                    value={inputForm.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-3">
                                <label
                                    className="font-semibold text-[13px]  text-gray-800"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <br />
                                <textarea
                                    rows={5}
                                    type="text"
                                    id="description"
                                    placeholder="Enter product descripton"
                                    className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                    name="description"
                                    value={inputForm.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-5">
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800 m"
                                        htmlFor="category"
                                    >
                                        BRAND
                                    </label>
                                    <FormControl className="capitalize  " fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryChange}

                                            className="mt-2"
                                            displayEmpty
                                            onChange={
                                                handleCategoryChange
                                            }
                                        >
                                            <MenuItem value=''>
                                                <em>None</em>
                                            </MenuItem>
                                            {allCategories &&
                                                allCategories.categories &&
                                                allCategories.categories.map((category) => {
                                                    return (
                                                        <MenuItem
                                                            className="capitalize"
                                                            key={category._id}
                                                            value={category._id}
                                                            onClick={()=>selectCatname(category.name)}
                                                        >
                                                            {category.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                    </FormControl>
                                </div>
                          
                                
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800"
                                        htmlFor="price"
                                    >
                                        PRICE
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Enter price"
                                        className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                        name="price"
                                        value={inputForm.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800"
                                        htmlFor="oldPrice"
                                    >
                                        OLD PRICE
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        id="oldPrice"
                                        placeholder="Enter old price"
                                        className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                        name="oldprice"
                                        value={inputForm.oldprice}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800 m"
                                        htmlFor="category"
                                    >
                                        IS FEATURED
                                    </label>
                                    <FormControl className="" fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={inputForm.isFeatured}
                                            className="mt-2"
                                            displayEmpty

                                            name="isFeatured"
                                            onChange={handleIsFeaturedChange}
                                        >
                                            <MenuItem value={true}>True</MenuItem>
                                            <MenuItem value={false}>False</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800"
                                        htmlFor="productStock"
                                    >
                                        PRODUCT STOCK
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        id="productStock"
                                        placeholder="Enter stock amount"
                                        className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                        name="countInStock"
                                        value={inputForm.countInStock}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="col-span-2">
                                    <label
                                        className="font-semibold  text-[13px]  text-gray-800"
                                        htmlFor="productStock"
                                    >
                                        DISCOUNT
                                    </label>
                                    <br />
                                    <input
                                        type="number"
                                        id="productStock"
                                        placeholder="Enter stock amount"
                                        className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                        name="discount"
                                        value={inputForm.discount}
                                        onChange={handleChange}

                                    />
                                </div> */}
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold  text-[13px]  text-gray-800 m"
                                        htmlFor="category"
                                    >
                                        PRODUCT RAM
                                    </label>
                                   
                                    <FormControl className="uppercase" fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={ramChange}
                                            className="mt-2"
                                            displayEmpty
                                            placeholder='as'

                                            onChange={handleRamChange}
                                           
                                        >
                                            
                                            {allRams &&
                                                allRams.rams &&
                                                allRams.rams.map((ram) => {
                                                    return (
                                                        <MenuItem
                                                            className="uppercase"
                                                            key={ram._id}
                                                            value={ram.name}
                                                        >
                                                            {ram.name}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Select>
                                    </FormControl>
                                </div>
                           
                                
                                {/* <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px]  text-gray-800"
                                        htmlFor="rating"
                                    >
                                        RATING
                                    </label>
                                    <br />

                                    <Rating
                                        name="half-rating"
                                        value={inputForm.rating}

                                        
                                        onChange={(e, newValue) => {

                                            setInputForm(() => ({
                                                ...inputForm,
                                                rating: newValue,
                                            }));
                                        }}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                    <div className="bg-white p-6 mt-5">
                                        <h1 className="text-xl font-semibold mb-2">Product Specification</h1>
                                        <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-5">
                                        <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="display"
                                                        >
                                                            DISPLAY SIZE
                                                        </label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="display"
                                                            placeholder="Enter display size"
                                                            className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                                            name="displaySize"
                                                            value = {inputForm.displaySize}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                        <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="battery"
                                                        >
                                                            BATTERY CAPACITY
                                                        </label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="battery"
                                                            placeholder="Enter battery capacity"
                                                            className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                                            name="batteryCapacity"
                                                            onChange={handleChange}
                                                            value = {inputForm.batteryCapacity}

                                                        />
                                                    </div>
                                        <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="camera"
                                                        >
                                                           CAMERA
                                                        </label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="camera"
                                                            placeholder="Enter camera pixels"
                                                            className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                                            name="camera"
                                                            onChange={handleChange}
                                                            value = {inputForm.camera}

                                                        />
                                                    </div>
                                        <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="processor"
                                                        >
                                                           PROCESSOR
                                                        </label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="processor"
                                                            placeholder="Enter processor"
                                                            className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                                            name="processor"
                                                            value = {inputForm.processor}
                                                            
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                        <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="storage"
                                                        >
                                                           STORAGE
                                                        </label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="storage"
                                                            placeholder="Enter storage like 64GB ..."
                                                            className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                                            name="storage"
                                                            value = {inputForm.storage}

                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                 
                    <div className="col-span-2">
                                                        <label
                                                            className="font-semibold text-[13px] text-gray-800 m"
                                                            htmlFor="offer"
                                                        >
                                                           OFFER
                                                        </label>
                                                        <FormControl className="" fullWidth>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={offerChange}
                                                                className="mt-2"
                                                                displayEmpty
                                                                name="offer"
                                                        
                                                                onChange={hanldeOffer}
                                                            >
                                                                <MenuItem value={true}>True</MenuItem>
                                                                <MenuItem value={false}>False</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-span-2 lg:col-span-3">
                                                    <label
                                                            className="font-semibold text-[13px] text-gray-800"
                                                            htmlFor="storage"
                                                        >
                                                           COLOR
                                                        </label>
                      <SelectColor
                        options={colorOptions}
                        isMulti
                        name="color"
                        
                        placeholder="Select Colors"
                        value={inputForm.color.map((c) => colorOptions.find((opt) => opt.value === c))}
                        onChange={(selectedColors) =>
                          setInputForm({
                            ...inputForm,
                            color: selectedColors.map((item) => item.value.split(',')) // Split colors here
                            .flat(),  // Split colors here
                            
                          })
                        }
                        className="input-box  outline-none  p-2 col-span-2 " styles={{
                            control: (base) => ({
                              ...base,
                              backgroundColor: "#F3F4F6", // Light gray background
                              border: "1px solid #D1D5DB", // Gray border
                              borderRadius: "8px",
                              padding: "8px",
                              boxShadow: "none",
                           
                              "&:hover": {
                                borderColor: "#9CA3AF", // Darker border on hover
                              },
                            }),
                            menu: (base) => ({
                              ...base,
                              borderRadius: "8px",
                              backgroundColor: "#FFFFFF",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                              zIndex: 50,
                            }),
                            multiValue: (base) => ({
                              ...base,
                              backgroundColor: "#E5E7EB", // Light gray badge background
                              borderRadius: "8px",
                              padding: "2px 6px",
                            }),
                            multiValueLabel: (base) => ({
                              ...base,
                              color: "#374151", // Dark text
                              fontSize: "14px",
                            }),
                            multiValueRemove: (base) => ({
                              ...base,
                              color: "#EF4444", // Red delete icon
                              "&:hover": {
                                backgroundColor: "#F87171",
                                color: "white",
                              },
                            }),
                            placeholder: (base) => ({
                              ...base,
                              color: "#9CA3AF",
                              fontSize: "14px",
                            }),
                          }}
                      />
                    </div>
                    <div className="flex items-center bg-white min-h-[100px] flex-wrap gap-2 mt-2">
  {inputForm.color.map((c, i) => (
    <div
      key={i}
      title={c}
      className="w-6 h-6 rounded-full border border-gray-300"
      style={{ backgroundColor: c.toLowerCase() }}
    ></div>
  ))}
</div>       </div>
                                    </div>


                <div className="bg-white mt-4 p-4">
                    <h3 className="text-xl font-semibold">Media And Published</h3>
                    <div>
                        <div className="w-full mt-6 flex flex-wrap gap-5 ">
                            {productImagesArr.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        className="w-[150px] h-[150px] rounded-xl border-dashed border-gray-400 border"
                                        alt=""
                                    />
                                    <span className="absolute -top-1 -right-1  z-20 bg-red-700 rounded-full">
                                        <IoCloseSharp
                                            onClick={() => handleRemoveImage(index)}
                                            className="text-xl text-white cursor-pointer"
                                        />
                                    </span>
                                </div>
                            ))}

                            <div className=" relative w-[150px] h-[150px] rounded-xl  flex justify-center hover:bg-green-100 transition-all duration-300 items-center border-dashed border-gray-400 border">
                                <input
                                    type="file"
                                    multiple
                                    className="w-full h-[150px] absolute  z-20 cursor-default opacity-0 outline-none "
                                    id="inputFile"
                                    name="images"
                                    onChange={hanldeFileChanges}
                                />
                                <div className=" absolute flex flex-col justify-center items-center   cursor-default ">
                                    <div className="opacity-35 flex justify-center items-center flex-col">
                                        <span>
                                            <FaRegImages className="text-[50px]" />
                                        </span>
                                        <h3 className="font-semibold">Image upload</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="w-full bg-green-500 rounded-md hover:bg-green-600 transition-all duration-300">
                            <Button type="submit" className="w-full flex gap-3">
                                {" "}
                                <span className="text-white text-3xl">
                                    <FaCloudUploadAlt />
                                </span>{" "}
                                <p className="text-white flex items-centerm gap-2 text-lg font-semibold">
                                    {isLoading === false ? (
                                        "publish and view "
                                    ) : (
                                        <CircularProgress color="inherit " className="loader" />
                                    )}
                                </p>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <Snackbar open={open.open} autoHideDuration={1000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={open.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {open.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default UpdateProduct