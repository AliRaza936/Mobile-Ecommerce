import express from 'express'
import {  allUsers, authWithGoogle, changePassword, deleteUser, forgetPassowrd, logoutPage, resetPassword, signin, signUp, singleUser, updateUser, verifyOTP } from './controller.js'
import {authMiddleware} from '../middleWare/authMiddleWare.js'


let userRoutes = express.Router()
 userRoutes.post('/signup',signUp)
userRoutes.post('/authWithGoogle',authWithGoogle)


 userRoutes.post('/verifyotp',verifyOTP)
userRoutes.post('/signin',signin)
userRoutes.post('/forgotpassword',forgetPassowrd)
userRoutes.post('/reset',resetPassword)
userRoutes.get('/logout',logoutPage)

userRoutes.get('/all',allUsers)
userRoutes.get('/single/:id',singleUser)

userRoutes.delete('/delete/:userId',deleteUser)
userRoutes.put('/update/:id',updateUser)
userRoutes.put('/changePassword/:id',changePassword)


export default userRoutes