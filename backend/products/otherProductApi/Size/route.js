import express from 'express'
import { all, create, deleteProduct, getSingle, update } from './controller.js'




let productSizeRoutes = express.Router()

productSizeRoutes.post('/create',create)

productSizeRoutes.get('/all',all)

productSizeRoutes.get('/single/:Id',getSingle)

productSizeRoutes.delete('/delete/:Id',deleteProduct)
productSizeRoutes.put('/update/:Id',update)

export default productSizeRoutes