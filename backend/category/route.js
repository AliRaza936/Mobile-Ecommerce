
import express from 'express'
import { allCategory, createCategory, deleteCategory, singleCategory, updateCategory } from './controller.js'
import {upload} from '../middleWare/multer.js'

let categoryRoutes = express.Router()
 categoryRoutes.post('/create',upload.fields([{ name: 'images', maxCount: 10 }, { name: 'banner', maxCount: 1 }]) ,createCategory)
categoryRoutes.get('/all',allCategory)

categoryRoutes.get('/single/:categoryId?',singleCategory)

categoryRoutes.delete('/delete/:categoryId',deleteCategory)
categoryRoutes.put('/update/:categoryId',upload.fields([{ name: 'images', maxCount: 10 }, { name: 'banner', maxCount: 1 }]),updateCategory)


export default categoryRoutes