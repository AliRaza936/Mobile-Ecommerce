import accessoryModel from "./model.js";
import { uploadImage, deleteImageFromCloudinary } from "../cloudinary/cloudinary.js";

export const createAccessory = async (req, res) => {
  try {
    const { name } = req.body;
    const { images, banner } = req.files;
console.log(images,banner)

    // if (!name || !image || !banner) {
    //   return res.status(400).send({ success: false, message: "All fields are required" });
    // }

    const uploadedImage = await uploadImage(images[0].path, "Pricemaart");
    const uploadedBanner = await uploadImage(banner[0].path, "Pricemaart");

    const accessory = await accessoryModel.create({
      name,
      images: uploadedImage.secure_url,
      banner: uploadedBanner.secure_url,
    });

    res.status(201).send({
      success: true,
      message: "Accessory created successfully",
      accessory,
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Error creating accessory", error });
  }
};

export const getAllAccessories = async (req, res) => {
  try {
    const accessories = await accessoryModel.find();
    res.status(200).send({
      success: true,
      message: "Accessories fetched successfully",
      accessories,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching accessories", error });
  }
};

export const deleteAccessory = async (req, res) => {
  try {
    const { accessoryId } = req.params;

    const accessory = await accessoryModel.findById(accessoryId);
    if (!accessory) {
      return res.status(404).send({ success: false, message: "Accessory not found" });
    }

    const imagePublicId = accessory.images[0].split('/').slice(-2).join('/').split('.').at(-2);
    const bannerPublicId = accessory.banner[0].split('/').slice(-2).join('/').split('.').at(-2);

    await deleteImageFromCloudinary(imagePublicId);
    await deleteImageFromCloudinary(bannerPublicId);

    await accessoryModel.findByIdAndDelete(accessoryId);

    res.status(200).send({ success: true, message: "Accessory deleted successfully" });

  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false, message: "Error deleting accessory", error });
  }
};

export const updateAccessory = async (req, res) => {
  try {
    const { accessoryId } = req.params;
    const { name } = req.body;
    const files = req.files;

    const accessory = await accessoryModel.findById(accessoryId);
    if (!accessory) {
      return res.status(404).send({ success: false, message: "Accessory not found" });
    }

    let updatedImage = accessory.images;
    let updatedBanner = accessory.banner;

    // Update Image if provided
    if (files.images) {
      console.log(accessory.images
      )
      const imagePublicId = accessory.images[0].split('/').slice(-2).join('/').split('.').at(-2);
      await deleteImageFromCloudinary(imagePublicId);

      const uploadedImage = await uploadImage(files.images[0].path, "Pricemaart");
      updatedImage = uploadedImage.secure_url;
    }

    // Update Banner if provided
    if (files.banner) {
      const bannerPublicId = accessory.banner[0].split('/').slice(-2).join('/').split('.').at(-2);
      await deleteImageFromCloudinary(bannerPublicId);

      const uploadedBanner = await uploadImage(files.banner[0].path, "Pricemaart");
      updatedBanner = uploadedBanner.secure_url;
    }

    const updatedAccessory = await accessoryModel.findByIdAndUpdate(
      accessoryId,
      {
        name: name || accessory.name,
        images: updatedImage,
        banner: updatedBanner,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Accessory updated successfully",
      updatedAccessory,
    });

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error updating accessory",
      error,
    });
  }
};
export const getSingleAccessory = async (req, res) => {
  try {
    const { accessoryId } = req.params;
    const { name } = req.query;

    let accessory;

    if (accessoryId) {
      accessory = await accessoryModel.findById(accessoryId);
    } else if (name) {
      accessory = await accessoryModel.findOne({ name: name });
    } else {
      return res.status(400).send({
        success: false,
        message: "Please provide either accessoryId or name",
      });
    }

    if (!accessory) {
      return res.status(404).send({
        success: false,
        message: "Accessory not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Accessory fetched successfully",
      accessory,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success: false,
      message: "Error fetching accessory",
      error: error.message,
    });
  }
};

