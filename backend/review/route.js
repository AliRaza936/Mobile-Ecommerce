import express from 'express'
import { addReview, reviewByProduct } from './controller.js'
import {authMiddleware} from '../middleWare/authMiddleWare.js'




let reviewRoutes = express.Router()

reviewRoutes.post('/add/:id',addReview)
reviewRoutes.get('/all',reviewByProduct)


export default reviewRoutes