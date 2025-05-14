import { deleteImageFromCloudinary, uploadImage } from "../cloudinary/cloudinary.js";
import saleBannerModel from "../saleBanner/model.js";

// Create Banner
let createBanner = async (req, res) => {
  try {
    
     
    let bannerFile = req.file;

    let uploadBanner = await uploadImage(bannerFile.path, "Pricemaart");

    let banner = await saleBannerModel.create({

      imageUrl: uploadBanner.secure_url,
    });

    return res.status(201).send({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: "Error in creating banner", error });
  }
};

// Get All Banners
let allBanners = async (req, res) => {
  try {
    let banners = await saleBannerModel.find();
    return res.status(200).send({
      success: true,
      message: "Banners fetched successfully",
      length: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in fetching banners", error });
  }
};

// Get Single Banner
let singleBanner = async (req, res) => {
  try {
    let { bannerId } = req.params;
    let banner = await saleBannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).send({ success: false, message: "Banner not found" });
    }
    return res.status(200).send({
      success: true,
      message: "Banner fetched successfully",
      banner,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error in fetching banner", error });
  }
};

// Update Banner
let updateBanner = async (req, res) => {
  try {
    let { bannerId } = req.params;
    
    let bannerFile = req.file;

    let banner = await saleBannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).send({ success: false, message: "Banner not found" });
    }

    let newBanner = banner.imageUrl;

    if (bannerFile) {
      let publicId = banner.imageUrl.split("/").slice(-2).join("/").split(".").at(-2);
      await deleteImageFromCloudinary(publicId);
      let uploadBanner = await uploadImage(bannerFile.path, "Pricemaart");
      newBanner = uploadBanner.secure_url;
    }

    let updatedBanner = await saleBannerModel.findByIdAndUpdate(
      bannerId,
      {  imageUrl: newBanner },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Banner updated successfully",
      updatedBanner,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: "Error in updating banner", error });
  }
};

// Delete Banner
let deleteBanner = async (req, res) => {
  try {
    let { bannerId } = req.params;
    let banner = await saleBannerModel.findById(bannerId);
    if (!banner) {
      return res.status(404).send({ success: false, message: "Banner not found" });
    }

    let publicId = banner.imageUrl.split("/").slice(-2).join("/").split(".").at(-2);
    await deleteImageFromCloudinary(publicId);
    await saleBannerModel.findByIdAndDelete(bannerId);

    return res.status(200).send({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false, message: "Error in deleting banner", error });
  }
};


export { createBanner, allBanners, singleBanner, updateBanner, deleteBanner };
