

import salesModel from '../salesData/model.js'
import orderModel from '../order/model.js'
const getSalesData = async (req, res) => {
  try {
    let { year } = req.query;
    if (!year) {
      year = new Date().getFullYear(); // Default to current year
    }

    let salesData = await salesModel.find({ year });

    return res.status(200).send({
      success: true,
      salesData
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send({ success: false, message: "Server error", error });
  }
};
const getAllYears = async (req, res) => {
  try {
    // Get all orders with their createdAt field
    const orders = await orderModel.find({}, { createdAt: 1 });

    // Extract unique years from createdAt timestamps
    const years = [...new Set(orders.map(order => new Date(order.createdAt).getFullYear()))];

    // Sort years in descending order (latest first)
    years.sort((a, b) => b - a);

    return res.status(200).json({ years });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server Error", error });
  }
};

export {getSalesData,getAllYears}