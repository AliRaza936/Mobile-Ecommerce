import express from 'express'
import {  getAllYears, getSalesData } from './controller.js'




let saleRoutes = express.Router()


saleRoutes.get('/',getSalesData)
saleRoutes.get("/years", getAllYears);

export default saleRoutes