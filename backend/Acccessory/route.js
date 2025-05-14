
import express from 'express'
import { createAccessory, getAllAccessories, deleteAccessory,updateAccessory,getSingleAccessory } from "./controller.js";
import {upload} from '../middleWare/multer.js'

let accessoryRoutes = express.Router()
accessoryRoutes.post("/create", upload.fields([{ name: "images", maxCount: 1 }, { name: "banner", maxCount: 1 }]), createAccessory);
accessoryRoutes.get("/all", getAllAccessories);
accessoryRoutes.get("/single/:accessoryId?", getSingleAccessory);
accessoryRoutes.delete("/delete/:accessoryId", deleteAccessory);
accessoryRoutes.put(
    "/update/:accessoryId",
    upload.fields([{ name: "images", maxCount: 1 }, { name: "banner", maxCount: 1 }]),
    updateAccessory
  );
// accessoryRoutes.put('/update/:categoryId',upload.fields([{ name: 'images', maxCount: 10 }, { name: 'banner', maxCount: 1 }]),updateCategory)


export default accessoryRoutes