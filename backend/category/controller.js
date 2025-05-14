import { deleteImageFromCloudinary, uploadImage } from "../cloudinary/cloudinary.js";
import categoryModel from "../category/model.js";

let createCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let images = req.files.images;
    let banner = req.files.banner;

    
    console.log(images, banner)

    if (!name || !images || !banner) {
      return res
        .status(401)
        .send({ success: false, message: "Please fill all fields" });
    }
    
    let uploadImages = await Promise.all(
      images.map((filePath) => {
        return uploadImage(filePath.path, "Pricemaart");
      })
    );
    let uploadBanner = await uploadImage(banner[0].path, "Pricemaart");

    let picturesUrl = uploadImages.map((uploadImag) => uploadImag.secure_url);

    let category = await categoryModel.create({
      name,
      images: picturesUrl,
      banner: uploadBanner.secure_url,
    });
    return res
      .status(201)
      .send({
        success: true,
        message: "category create successfully",
        category,
      });
  } catch (error) {

    return res
      .status(500)
      .send({ success: false, message: "Error in creating category", error });
  }
};
let allCategory = async (req, res) => {
  try {




    let categories = await categoryModel.find()
    return res
      .status(201)
      .send({
        success: true,
        message: "categories fetched successfully",
        length:categories.length,
        'categories':categories,
        
      });
  } catch (error) {

    return res
      .status(500)
      .send({ success: false, message: "Error in fetching all category", error });
  }
};
let singleCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;  
    let { name } = req.query;  

    let category;

    if (categoryId) {
      category = await categoryModel.findById(categoryId);
    } else if (name) {
      category = await categoryModel.findOne({ name: name });
    } else {
      return res.status(400).send({
        success: false,
        message: "Please provide either categoryId or name",
      });
    }

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error fetching category",
      error: error.message,
    });
  }
};

let deleteCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;

    // Find the category
    let category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send({ success: false, message: "Category Not Found" });
    }

    // Delete each category image from Cloudinary with validation
    for (let img of category.images) {
      let publicId = img.split('/').slice(-2).join('/').split('.').at(-2);

      try {
        let response = await deleteImageFromCloudinary(publicId);
        if (!response || response.result !== "ok") {
          return res.status(500).send({
            success: false,
            message: `Failed to delete category image: ${img}`,
            cloudinaryResponse: response,
          });
        }
      } catch (cloudinaryError) {
        return res.status(500).send({
          success: false,
          message: `Error deleting category image`,
          error: cloudinaryError.message || cloudinaryError,
        });
      }
    }

    // Delete banner from Cloudinary (if exists), with validation
    if (category.banner) {
      let bannerPublicId = category.banner.split('/').slice(-2).join('/').split('.').at(-2);

      try {
        let bannerResponse = await deleteImageFromCloudinary(bannerPublicId);
        if (!bannerResponse || bannerResponse.result !== "ok") {
          return res.status(500).send({
            success: false,
            message: "Failed to delete category banner",
            cloudinaryResponse: bannerResponse,
          });
        }
      } catch (bannerError) {
        return res.status(500).send({
          success: false,
          message: "Error deleting category banner",
          error: bannerError.message || bannerError,
        });
      }
    }

    // All Cloudinary deletions successful, now delete the category
    await categoryModel.findByIdAndDelete(categoryId);

    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error deleting category",
      error: error.message || error,
    });
  }
};


let updateCategory = async (req, res) => {
  try {
    let { categoryId } = req.params;
    let { name } = req.body;
    let files = req.files;

    let category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).send({ success: false, message: "Category Not Found" });
    }

    let newImages = category.images;
    let newBanner = category.banner;

    // Handle Images Update
    if (files.images) {
      // Delete existing images from Cloudinary
      await Promise.all(
        category.images.map(async (img) => {
          let publicId = img.split('/').slice(-2).join('/').split('.').at(-2);
          await deleteImageFromCloudinary(publicId);
        })
      );

      // Upload new images
      let uploadImages = await Promise.all(
        files.images.map((file) => uploadImage(file.path, "Pricemaart"))
      );
      newImages = uploadImages.map((uploadImg) => uploadImg.secure_url);
    }

    // Handle Banner Update
    if (files.banner ) {
      // // Delete existing banner from Cloudinary
      // let publicId = category?.banner?.split('/').slice(-2).join('/').split('.').at(-2);
      // await deleteImageFromCloudinary(publicId);

      // Upload new banner
      let uploadBanner = await uploadImage(files.banner[0].path, "Pricemaart");
      newBanner = uploadBanner.secure_url;
    }

    // Update the category
    let updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name, images: newImages, banner: newBanner },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).send({

      success: false,
      message: "Error in updating category",
      error: error.message,
    });
  }
};

export { createCategory,allCategory,singleCategory,deleteCategory,updateCategory };
