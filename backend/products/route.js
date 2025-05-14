import express from 'express'

import {upload} from '../middleWare/multer.js'
import { allProducts, createProduct, deleteProduct, featuredProduct, getSingleProduct, offerProduct, updateProduct } from './controller.js'
let productRoutes = express.Router()

productRoutes.post('/create',upload.array('images'),createProduct)

productRoutes.get('/all',allProducts)

productRoutes.get('/single/:productId',getSingleProduct)
productRoutes.get('/featured',featuredProduct)
productRoutes.get('/offer',offerProduct)

productRoutes.delete('/delete/:productId',deleteProduct)
productRoutes.put('/update/:productId',upload.array('images'),updateProduct)

export default productRoutes