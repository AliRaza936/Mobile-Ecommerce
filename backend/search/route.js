import express from 'express'
import {  searchAccessoryOnly, searchAll, searchProductOnly } from './controller.js'



let searchRoutes = express.Router()

searchRoutes.get('/product', searchProductOnly); // For searching only products
searchRoutes.get('/accessory', searchAccessoryOnly); // For searching only accessories
searchRoutes.get('/combined', searchAll); // For combined search of products and accessories



export default searchRoutes