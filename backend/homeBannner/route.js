import express from "express";
import { allBanners, createBanner, deleteBanner, singleBanner, updateBanner,  } from "../homeBannner/controller.js";
import { upload } from "../middleWare/multer.js";


const bannerRoutes = express.Router();

bannerRoutes.post("/upload", upload.single("imageUrl"), createBanner);
bannerRoutes.get("/all", allBanners);
bannerRoutes.get("/single/:bannerId", singleBanner);
bannerRoutes.put("/update/:bannerId", upload.single("imageUrl"), updateBanner);
bannerRoutes.delete("/delete/:bannerId", deleteBanner);

export default bannerRoutes;
