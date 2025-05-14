import express from 'express'
import { all, create, deleteProduct, getSingle, update } from './controller.js'
import { allRams } from '../Ram/ramController.js'



let productWeightRoutes = express.Router()

productWeightRoutes.post('/create',create)

productWeightRoutes.get('/all',all)

productWeightRoutes.get('/single/:Id',getSingle)

productWeightRoutes.delete('/delete/:Id',deleteProduct)
productWeightRoutes.put('/update/:Id',update)

export default productWeightRoutes