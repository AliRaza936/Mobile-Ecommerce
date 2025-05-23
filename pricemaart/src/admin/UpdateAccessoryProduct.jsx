
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
const UpdateAccessoryProduct = () => {
    let [categoryChange, setCategoryChange] = useState('');
        let [imagesToRemove,setImagesToRemove] = useState([])
          
        
    const [open, setOpen] = React.useState({ open: false, message: '', severity: '' });
 let [inputForm, setInputForm] = useState({
        name: "",
        description: "",
        category: "",
        catName:"",
 
        brand: "",
        price: 0,
        oldprice: 0,
        isFeatured: false,
     
        countInStock: "",
        discount: 0,

        images: [],
        weight: "",       // ✅ New Field
        material: "",   // ✅ New Field
        waterResistance: "",            // ✅ New Field
        connectivity: "",         // ✅ New Field

        chargingTime: "",     
        backupTime:'', 
    
             warranty:'',
             batteryCapacity:'',
        color: [],             // ✅ New Field
                  // ✅ New Field
        offer: false, 
    });
    let context = useContext(MyContext)

    let [productImagesArr, setProductImagesArr] = useState([]);


    let [offerChange, setOfferChange] = useState(false);

    let navigate = useNavigate()
    let [isLoading, setIsLoading] = useState(false);
    let [allCategories, setAllCategories] = useState({})
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    let handleIsFeaturedChange = (e) => {
        setIsFeaturedChange(e.target.value);
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
            let result = await axios.get(`${BASE_URL}/accessory/all`, {
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
            let result = await axios.get(`${BASE_URL}/subProduct/single/${id}`, {
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
                brand: res.brand,
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
                catName: res.catName, // Update catName field
                
                weight:specs?.weight.trim(),
                material:specs?.material.trim(),
                waterResistance:specs?.waterResistance.trim(),
                connectivity:specs?.connectivity.trim(),
                chargingTime:specs?.chargingTime.trim(),
                backupTime:specs?.backupTime.trim(),
                batteryCapacity:specs?.batteryCapacity.trim(),
                warranty:specs?.warranty.trim(),
          
                color: specs?.color,
                offer:res?.offer
              
            })

            
            setOfferChange(res.offer)
        
            setCategoryChange(res.category._id)
            setIsFeaturedChange(res.isFeatured)
          
            setProductImagesArr(res.images)
           
        

        }
        catch (error) {
            console.log(error)
        }
    }
        let [isFeaturedChange, setIsFeaturedChange] = useState(false);

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
     
        formData.append("brand", inputForm.brand);
        formData.append("price", inputForm.price);
        formData.append("oldprice", inputForm.oldprice);
        formData.append("isFeatured", inputForm.isFeatured);
        formData.append("countInStock", inputForm.countInStock);

        formData.append("weight", inputForm.weight);
        formData.append("batteryCapacity", inputForm.batteryCapacity);
        formData.append("material", inputForm.material);
        formData.append("waterResistance", inputForm.waterResistance);
        formData.append("connectivity", inputForm.connectivity);
        formData.append("chargingTime", inputForm.chargingTime);
        formData.append("backupTime", inputForm.backupTime);

        formData.append("warranty", inputForm.warranty);
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
                `${BASE_URL}/subProduct/update/${id}`,
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
                        <h3 className="text-[22px] font-semibold text-gray-800">
                            Basic Information
                        </h3>

                        <div className="mt-3">
                            <div>
                                <label className="font-semibold text-[13px] text-gray-800" htmlFor="name">
                                    PRODUCT NAME
                                </label>
                                <br />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter product name"
                                    className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                    name="name"
                                    value={inputForm.name ||''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mt-3">
                                <label
                                    className="font-semibold text-[13px] text-gray-800"
                                    htmlFor="description"
                                >
                                    DESCRIPTION
                                </label>
                                <br />
                                <textarea
                                    rows={5}
                                    type="text"
                                    id="description"
                                    placeholder="Enter product descripton"
                                    className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                    name="description"
                                    value={inputForm.description || ''}

                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-6 mt-2 gap-4">
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px] text-gray-800 m"
                                        htmlFor="category"
                                    >
                                        CATEGORY
                                    </label>
                                    <FormControl className="capitalize  " fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={categoryChange}
                                            className="mt-2"
                                            displayEmpty
                                            onChange={handleCategoryChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {allCategories &&
                                                allCategories.accessories &&
                                                allCategories.accessories.map((category) => {
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
                                        className="font-semibold text-[13px] text-gray-800"
                                        htmlFor="brand"
                                    >
                                        BRAND
                                    </label>
                                    <br />
                                    <input
                                        type="text"
                                        id="brand"
                                        placeholder="Enter brand name"
                                        className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md"
                                        name="brand"
                                        value={inputForm?.brand}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px] text-gray-800"
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
                                        value={inputForm?.price}

                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px] text-gray-800"
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
                                        value={inputForm?.oldprice}

                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        className="font-semibold text-[13px] text-gray-800 m"
                                        htmlFor="category"
                                    >
                                        IS FEATURED
                                    </label>
                                    <FormControl className="" fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={isFeaturedChange}
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
                                        className="font-semibold text-[13px] text-gray-800"
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
                                        value={inputForm?.countInStock}

                                        onChange={handleChange}
                                    />
                                </div>
                       
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 mt-5">
    <h1 className="text-xl font-semibold mb-2">Accessory Specification</h1>
    <div className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-6 mt-2 gap-4">
        {/* Brand */}
        
        {/* Weight */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="weight">WEIGHT</label><br />
            <input type="text" id="weight" placeholder="e.g. 120g" name="weight" value={inputForm?.weight} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Material */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="material">MATERIAL</label><br />
            <input type="text" id="material" placeholder="e.g. Plastic, Metal" value={inputForm?.material} name="material" onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Water Resistance */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="waterResistance">WATER RESISTANCE</label><br />
            <input type="text" id="waterResistance" placeholder="e.g. IP67" name="waterResistance" value={inputForm?.waterResistance} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Connectivity */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="connectivity">CONNECTIVITY TYPE</label><br />
            <input type="text" id="connectivity" placeholder="e.g. Bluetooth 5.0, Wired" name="connectivity" value={inputForm?.connectivity} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Charging Time */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="chargingTime">CHARGING TIME</label><br />
            <input type="text" id="chargingTime" placeholder="e.g. 2 hours" name="chargingTime" value={inputForm?.chargingTime} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Backup Time */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="backupTime">BACKUP TIME</label><br />
            <input type="text" id="backupTime" placeholder="e.g. 8 hours" name="backupTime" value={inputForm?.backupTime} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="backupTime">BATTERY CAPACITY</label><br />
            <input type="text" id="backupTime" placeholder="eg. 5000mah" name="batteryCapacity" value={inputForm?.batteryCapacity} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Warranty */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="warranty">WARRANTY</label><br />
            <input type="text" id="warranty" placeholder="e.g. 1 Year" name="warranty" value={inputForm?.warranty} onChange={handleChange}
                className="p-3 w-full outline-none border mt-2 border-gray-400 py-4 px-5 rounded-md" />
        </div>

        {/* Offer (unchanged) */}
        <div className="col-span-2">
            <label className="font-semibold text-[13px] text-gray-800" htmlFor="offer">OFFER</label>
            <FormControl fullWidth>
                <Select
                    id="offer"
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

        {/* Color (unchanged) */}
        <div className="col-span-2 lg:col-span-3">
            <label className="font-semibold z-[10] text-[13px] text-gray-800">COLOR</label>
            <SelectColor
    options={colorOptions}
    isMulti
    name="color"
    placeholder="Select Colors"
    value={inputForm.color.map((c) => ({ value: c, label: c }))}
    onChange={(selectedColors) =>
      setInputForm({
        ...inputForm,
        color: selectedColors.map((item) => item.value.split(',')) // Split colors here
        .flat(), 
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
</div>
    </div>
</div>

                
                <div className="bg-white mt-4 p-4">
                    <h3 className="text-xl text-gray-800 font-semibold">Media And Published</h3>
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

export default UpdateAccessoryProduct