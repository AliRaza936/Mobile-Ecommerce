import sizeModel from "./model.js";
let create = async (req, res) => {
  try {
    let { name } = req.body;

    let isExist = await sizeModel.findOne({ name });
    if (isExist) {
      return res.status(401).send({
        success: true,
        message: "Size is already exist",
      });
    }
    let productSize = await sizeModel.create({
      name,
    });

    return res.status(201).send({
      success: true,
      message: "size add successfully",
      productSize,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in creating size", error });
  }
};
let all = async (req, res) => {
  try {
    let sizes = await sizeModel.find();

    return res.status(201).send({
      success: true,
      message: "sizes fetch successfully",
      sizes,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in get all sizes", error });
  }
};
let getSingle = async (req, res) => {
  try {
    let { Id } = req.params;
    let size = await sizeModel.findById(Id);
    if (!size) {
      return res
        .status(404)
        .send({ success: false, message: "size not found" });
    }
    return res.status(201).send({
      success: true,
      message: "size fetch successfully",
      size,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in get single size", error });
  }
};
let deleteProduct = async (req, res) => {
  try {
    let { Id } = req.params;
    let size = await sizeModel.findById(Id);
    if (!size) {
      return res
        .status(404)
        .send({ success: false, message: "size not found" });
    }

    await sizeModel.findByIdAndDelete(Id);

    return res.status(201).send({
      success: true,
      message: "size delete successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in delete size", error });
  }
};
let update = async (req, res) => {
  try {
    let { name } = req.body;

    let { Id } = req.params;
    let size = await sizeModel.findById(Id);

    if (!size) {
      return res
        .status(404)
        .send({ success: false, message: "size not Found" });
    }

    let isExist = await sizeModel.findOne({ name });
    if (isExist) {
      return res.status(401).send({
        success: true,
        message: "size is already exist",
      });
    }

    let updatesize = await sizeModel.findByIdAndUpdate(
      Id,
      {
        name: name,
      },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "size update successfully",
      updatesize,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in update size", error });
  }
};
export { create, all, getSingle, deleteProduct, update };
