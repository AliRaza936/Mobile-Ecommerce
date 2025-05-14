import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true }, // Store Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
