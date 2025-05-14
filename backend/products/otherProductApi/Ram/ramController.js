
import ramModel from "./ramModel.js";
  

  
  let createRam = async (req, res) => {
    try {
   
      let {
        name,
       
      } = req.body;
      
      let isExist = await ramModel.findOne({name})
      if(isExist){
        return res.status(401).send({
            success: true,
            message: "Ram is already exist",
            
          });
      }
      let productRam = await ramModel.create({
        name,
      
      });


      return res.status(201).send({
        success: true,
        message: "Ram add successfully",
        productRam,
      });
    } catch (error) {

      return res
        .status(500)
        .send({ success: false, message: "Error in creating ram", error });
        
    }
  };
  let allRams = async (req, res) => {
    try {
    
  
      let rams = await ramModel.find()
  
      return res.status(201).send({
        success: true,
        message: "rams fetch successfully",
        rams
      });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send({ success: false, message: "Error in get all rams", error });
    }
  };
  let getSingleram = async (req, res) => {
    try {
      let { ramId } = req.params;
      let ram = await ramModel.findById(ramId)
      if (!ram) {
        return res
          .status(404)
          .send({ success: false, message: "ram not found" });
      }
      return res.status(201).send({
        success: true,
        message: "ram fetch successfully",
        ram,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: "Error in get single ram", error });
    }
  };
  let deleteRam = async (req, res) => {
    try {
      let { ramId } = req.params;
      let ram = await ramModel.findById(ramId);
      if (!ram) {
        return res
          .status(404)
          .send({ success: false, message: "ram not found" });
      }
      
      await ramModel.findByIdAndDelete(ramId);
  
      return res.status(201).send({
        success: true,
        message: "ram delete successfully",
      });
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Error in delete ram", error });
    }
  };
  let updateRam = async (req, res) => {
    try {
     
      let {
        name
      } = req.body;

      let { ramId } = req.params;
      let ram = await ramModel.findById(ramId);

      if (!ram) {
        return res
          .status(404)
          .send({ success: false, message: "ram not Found" });
      }
    
      let isExist = await ramModel.findOne({name})
      if(isExist){
        return res.status(401).send({
            success: true,
            message: "Ram is already exist",
            
          });
      }
  
       let updateRam =  await ramModel.findByIdAndUpdate(ramId, {
        name: name,
        
      },{new:true});
  
      return res.status(201).send({
        success: true,
        message: "ram update successfully",
        updateRam
      });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .send({ success: false, message: "Error in update ram", error });
    }
  };
  export {
    createRam,
    allRams,
    getSingleram,
    deleteRam,
    updateRam,
  };
  