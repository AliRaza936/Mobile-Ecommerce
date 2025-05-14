
import weightModel from "./model.js";
  

  
  let create = async (req, res) => {
    try {
   
      let {
        name,
       
      } = req.body;
      
      let isExist = await weightModel.findOne({name})
      if(isExist){
        return res.status(401).send({
            success: true,
            message: "Weight is already exist",
            
          });
      }
      let productWeight = await weightModel.create({
        name,
      
      });


      return res.status(201).send({
        success: true,
        message: "Weight add successfully",
        productWeight,
      });
    } catch (error) {

      return res
        .status(500)
        .send({ success: false, message: "Error in creating weight", error });
        
    }
  };
  let all = async (req, res) => {
    try {
    
  
      let weights = await weightModel.find()
  
      return res.status(201).send({
        success: true,
        message: "weights fetch successfully",
        weights
      });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send({ success: false, message: "Error in get all weights", error });
    }
  };
  let getSingle = async (req, res) => {
    try {
      let { Id } = req.params;
      let weight = await weightModel.findById(Id)
      if (!weight) {
        return res
          .status(404)
          .send({ success: false, message: "weight not found" });
      }
      return res.status(201).send({
        success: true,
        message: "weight fetch successfully",
        weight,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: "Error in get single weight", error });
    }
  };
  let deleteProduct = async (req, res) => {
    try {
      let { Id } = req.params;
      let weight = await weightModel.findById(Id);
      if (!weight) {
        return res
          .status(404)
          .send({ success: false, message: "weight not found" });
      }
      
      await weightModel.findByIdAndDelete(Id);
  
      return res.status(201).send({
        success: true,
        message: "weight delete successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Error in delete weight", error });
    }
  };
  let update = async (req, res) => {
    try {
     
      let {
        name
      } = req.body;

      let { Id } = req.params;
      let weight = await weightModel.findById(Id);

      if (!weight) {
        return res
          .status(404)
          .send({ success: false, message: "weight not Found" });
      }
    
      let isExist = await weightModel.findOne({name})
      if(isExist){
        return res.status(401).send({
            success: true,
            message: "Weight is already exist",
            
          });
      }
  
       let updateWeight =  await weightModel.findByIdAndUpdate(Id, {
        name: name,
        
      },{new:true});
  
      return res.status(201).send({
        success: true,
        message: "weight update successfully",
        updateWeight
      });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send({ success: false, message: "Error in update weight", error });
    }
  };
  export {
    create,
    all,
    getSingle,
    deleteProduct,
    update,
  };
  