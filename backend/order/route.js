import express from 'express'

import { allAdminOrders, allOrders, changeOrderStatus, createOrder, singleOrder } from './controller.js'
import {authMiddleware} from '../middleWare/authMiddleWare.js'



let orderRoutes = express.Router()

orderRoutes.post('/create/:id',createOrder)
orderRoutes.get('/all/:id',allOrders)
orderRoutes.get('/allOrders',allAdminOrders)
orderRoutes.get('/single/:id',singleOrder)
orderRoutes.put('/changeStatus/:id',changeOrderStatus)





export default orderRoutes