import express from "express";
import { allBanners, createBanner, deleteBanner, singleBanner, updateBanner,  } from "../saleBanner/controller.js";
import { upload } from "../middleWare/multer.js";


const saleBannerRoutes = express.Router();

saleBannerRoutes.post("/upload", upload.single("imageUrl"), createBanner);
saleBannerRoutes.get("/all", allBanners);
saleBannerRoutes.get("/single/:bannerId", singleBanner);
saleBannerRoutes.put("/update/:bannerId", upload.single("imageUrl"), updateBanner);
saleBannerRoutes.delete("/delete/:bannerId", deleteBanner);

export default saleBannerRoutes;
