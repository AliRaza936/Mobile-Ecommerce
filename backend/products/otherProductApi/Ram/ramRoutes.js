import express from 'express'
import { allRams, createRam, deleteRam, getSingleram, updateRam } from './ramController.js'



let productRamRoutes = express.Router()

productRamRoutes.post('/create',createRam)

productRamRoutes.get('/all',allRams)

productRamRoutes.get('/single/:ramId',getSingleram)

productRamRoutes.delete('/delete/:ramId',deleteRam)
productRamRoutes.put('/update/:ramId',updateRam)

export default productRamRoutes