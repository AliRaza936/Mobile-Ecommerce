import express from 'express'

import {upload} from '../middleWare/multer.js'
import { allProducts, createProduct, deleteProduct, featuredProduct, getSingleProduct, offerProduct, updateProduct } from './controller.js'
let subProductRoutes = express.Router()

subProductRoutes.post('/create',upload.array('images'),createProduct)

subProductRoutes.get('/all',allProducts)

subProductRoutes.get('/single/:productId',getSingleProduct)
subProductRoutes.get('/featured',featuredProduct)
subProductRoutes.get('/offer',offerProduct)

subProductRoutes.delete('/delete/:productId',deleteProduct)
subProductRoutes.put('/update/:productId',upload.array('images'),updateProduct)

export default subProductRoutes