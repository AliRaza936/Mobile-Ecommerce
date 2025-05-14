
import {
  deleteImageFromCloudinary,
  uploadImage,
} from "../cloudinary/cloudinary.js";
import accessoryModel from '../Acccessory/model.js'
import productModel from "../AccessoryProduct/model.js";


let createProduct = async (req, res) => {
  try {
    let path = req.files;
    let {
      name,
      description,
      brand,
      price,
      countInStock,
      category,
      catName,
     
      backupTime,
      oldprice,
      isFeatured,
      
      warranty,
      // productRAM,
      // productSIZE,
      // productWEIGHT,
      weight,
      material,
      waterResistance,
      connectivity,

      chargingTime,
  batteryCapacity,
      color,
   
      offer,
    } = req.body;
    
    // const productRAMIds =productRAM ? productRAM.split(',').map((id) =>  new mongoose.Types.ObjectId(id)):[];
    // const productSIZEIds =productSIZE ? productSIZE.split(',').map((id) => new  mongoose.Types.ObjectId(id)):[];
    // const productWEIGHTIds =  productWEIGHT ? productWEIGHT.split(',').map((id) =>  new mongoose.Types.ObjectId(id)) :[] 
   
    
    let uploadImages = await Promise.all(
      path.map((filePath) => {
        return uploadImage(filePath.path, "Pricemaart");
      })
    );
    let picturesUrl = uploadImages.map((uploadImag) => uploadImag.secure_url);

    let product = await productModel.create({
      name,
      images: picturesUrl,
      description,
      brand,
      price,
      catName,
   
      countInStock,
      category,
      oldprice,
      isFeatured,
    
      warranty,
      // productRAM:productRAMIds,
      // productSIZE:productSIZEIds,
      // productWEIGHT:productWEIGHTIds,
      phoneSpecs: {
        weight,
        material,
        waterResistance,
        connectivity,
     color,
        chargingTime,
        batteryCapacity,
      backupTime,
warranty, 
       
      },
      offer, 
    });
  ;

    return res.status(201).send({
      success: true,
      message: "product create successfully",
      product,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in creating product", error });
      
  }
};
const allProducts = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 10; // Default to 10 products per page
    const count = await productModel.countDocuments();
    let filter = {}; // Object to store filtering conditions

    // ✅ If No Query Parameters, Return All Products Without Pagination
    if (Object.keys(req.query).length === 0) {
      const allProducts = await productModel.find().populate("category");
      return res.status(200).send({
        success: true,
        message: "All products fetched successfully",
        products: allProducts,
        productLength :count
      });
    }

    // ✅ Filter by Category Name (catName)
    if (req.query.catName) {
      const category = await accessoryModel.findOne({ name: req.query.catName }); 
      if (category) {
        filter.category = category._id; // Filter by category ID
      } else {
        return res.status(404).send({ success: false, message: "Accesory not found" });
      }
    }

    // ✅ Filter by Price Range (if minPrice and maxPrice exist)
    if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
      filter.price = { 
        $gte: parseInt(req.query.minPrice), 
        $lte: parseInt(req.query.maxPrice) 
      };
    }

    // ✅ Get Total Products Count After Filtering
    let totalPosts = await productModel.countDocuments(filter);
    let totalPages = Math.ceil(totalPosts / perPage);

    // ✅ Fetch Filtered & Paginated Products
    let products = await productModel
      .find(filter)
      .populate("category")
       .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    return res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      products,
      page,
      totalPages,
      productLength:count
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Error in getting product", error });
  }
};


let getSingleProduct = async (req, res) => {
  try {
    let { productId } = req.params;
    let product = await productModel.findById(productId).populate("category");
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not Found" });
    }
    return res.status(201).send({
      success: true,
      message: "product fetch successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in get single product", error });
  }
};

let featuredProduct = async (req, res) => {
  try {
   
    let product =  await productModel.find({ isFeatured: true }).populate("category");
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not Found" });
    }
    return res.status(201).send({
      success: true,
      message: "product fetch successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in get single product", error });
  }
};
let offerProduct = async (req, res) => {
  try {
   
    let product =  await productModel.find({ offer: true }).populate("category");
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not Found" });
    }
    return res.status(201).send({
      success: true,
      message: "product fetch successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in get single product", error });
  }
};
let deleteProduct = async (req, res) => {
  try {
    let { productId } = req.params;
    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not Found", error });
    }
    const deletePromises = product.images.map((img) => {
      let publicId = img.split("/").slice(-2).join("/").split(".").at(-2);
      return deleteImageFromCloudinary(publicId);
    });

    await Promise.all(deletePromises);
    await productModel.findByIdAndDelete(productId);

    return res.status(201).send({
      success: true,
      message: "product delete successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in delete product", error });
  }
};

let updateProduct = async (req, res) => {
  try {
    let path = req.files;
    let {
      name,
      description,
      brand,
      price,
      countInStock,
      category,
      catName,
     
      backupTime,
      oldprice,
      isFeatured,
      
      warranty,
      // productRAM,
      // productSIZE,
      // productWEIGHT,
      weight,
      material,
      waterResistance,
      connectivity,

      chargingTime,
   
  batteryCapacity,
      color,
      imagesToRemove,
      offer,
    } = req.body;
  
  
    if (typeof imagesToRemove === "string") {
      imagesToRemove = [imagesToRemove]; // Convert to array if it's a single string
  } else if (!Array.isArray(imagesToRemove)) {
      imagesToRemove = []; // Default to empty array if it's not an array
  }

    let { productId } = req.params;
    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .send({ success: false, message: "product not Found" });
    }
    let picturesUrl = [...product.images]
  
    if(imagesToRemove&& imagesToRemove.length > 0){
      await Promise.all(
        imagesToRemove.map(async (img) => {
          let publicId = img.split("/").slice(-2).join("/").split(".").at(-2);
       
                  await deleteImageFromCloudinary(publicId);
             picturesUrl = picturesUrl.filter((image)=>image !== img)
        })
      );
    }
    if(path && path.length > 0 ){
      let uploadImages = await Promise.all(
        path.map((filePath) => {
          return uploadImage(filePath.path, "Pricemaart");
        })
      );
       picturesUrl = [...picturesUrl,...uploadImages.map((uploadImag) => uploadImag.secure_url)];
   
    }
      
     let updateProduct =  await productModel.findByIdAndUpdate(productId, {
      name: name,
      description: description,
      brand: brand,
      price: price,
      countInStock: countInStock,
      category: category,
  
      catName:catName,
       oldprice: oldprice,
      isFeatured: isFeatured,
      images:picturesUrl,
     
    
      // productRAM:productRAM?productRAM.split(","):[],
      // productSIZE: req.body.productSIZE ? req.body.productSIZE.split(',') : [],
      // productWEIGHT:productWEIGHT?productWEIGHT.split(","):[]
      phoneSpecs: {
        weight:weight,
        material:material,
        chargingTime:chargingTime,
        batteryCapacity:batteryCapacity,
        waterResistance:waterResistance,
        connectivity:connectivity,
     color:color,
     warranty:warranty,
     backupTime: backupTime,
 
      },
     
      offer:offer,
    },{new:true});

    return res.status(201).send({
      success: true,
      message: "product update successfully",
      updateProduct
    });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in update product", error });
  }
};
export {
  createProduct,
  allProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  featuredProduct,
  offerProduct
};
