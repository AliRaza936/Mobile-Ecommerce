import mongoose from "mongoose";

const saleBannerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }, // Store Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("SaleBanner", saleBannerSchema);
