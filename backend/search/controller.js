import productModel from "../products/model.js";
import accessoryModel from '../AccessoryProduct/model.js'
import mongoose from "mongoose";

let searchProductOnly = async (req, res) => {
  try {
    let query = req.query.q;

    if (!query) {
      return res.status(400).send({ success: false, message: "Query is required" });
    }

    let filter = mongoose.Types.ObjectId.isValid(query)
      ? { _id: query }
      : {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { catName: { $regex: query, $options: "i" } },
            { productRAM: { $regex: query, $options: "i" } },
          ],
        };

    const products = await productModel.find(filter).populate("category productRAM");

    return res.status(200).send({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Server Error", error });
  }
};


let searchAccessoryOnly = async (req, res) => {
  try {
    let query = req.query.q;

    if (!query) {
      return res.status(400).send({ success: false, message: "Query is required" });
    }

    let filter = mongoose.Types.ObjectId.isValid(query)
      ? { _id: query }
      : {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { catName: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
          ],
        };

    const accessories = await accessoryModel.find(filter).populate("category");

    return res.status(200).send({ success: true, products:accessories });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Server Error", error });
  }
};  
let searchAll = async (req, res) => {
  try {
    let query = req.query.q;

    if (!query) {
      return res.status(400).send({ success: false, message: "Query is required" });
    }

    let filter = mongoose.Types.ObjectId.isValid(query)
      ? { _id: query }
      : {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { catName: { $regex: query, $options: "i" } },
            { productRAM: { $regex: query, $options: "i" } },
          ],
        };

    const products = await productModel.find(filter).populate("category productRAM");
    const accessories = await accessoryModel.find(filter).populate("category");

    // You can optionally add a custom `type` here
    const combined = [
      ...products.map(p => ({ ...p._doc, type: "product" })),
      ...accessories.map(a => ({ ...a._doc, type: "accessory" })),
    ];

    return res.status(200).send({ success: true, results: combined });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Server Error", error });
  }
};
export {
  searchProductOnly,
  searchAccessoryOnly,
  searchAll,
};
