

import reviewModel from "../review/model.js";


let addReview = async (req, res) => {
  try {
let userId = req.params.id

    let {
      review,
      productId,
      rating,
    } = req.body;

    let reviewAdd = await reviewModel.create({
    review,userId,productId,rating
    });
  ;

    return res.status(201).send({
      success: true,
      message: "review add successfully",
      reviewAdd,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in add review", error });
      
  }
};
let reviewByProduct = async (req, res) => {
  try {
   
    let reviews = [];

    if (req.query.productId) {
      reviews = await reviewModel
        .find({ productId: req.query.productId })
        .populate({ path: "userId", select: "-password" }); // ✅ Corrected population
    } else {
      reviews = await reviewModel
        .find()
        .populate({ path: "userId", select: "-password" }); // ✅ Corrected here too
    }
    
    return res.status(200).send({
      success: true,
      reviews, // ✅ No need to put in quotes
    });





    
   
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .send({ success: false, message: "Error in getting review", error });
  }
};

export {
  addReview,
  reviewByProduct,
 
};
