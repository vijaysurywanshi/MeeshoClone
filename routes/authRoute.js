import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
// we are using diffrent file for diffrent routes because we dont want to mess with the server.js
// instead of writing all the code in server.js we can write it in this file 
const router = express.Router();

//routes

//http://localhost:8080/api/v1/auth/register  This is for registration
router.post('/register', registerController)//http://localhost:8080/api/v1/auth/register when someone calls this route it will call registerController function in authController file 


//login

router.post('/login', loginController);
//forgot password
router.post('/forgot-password', forgotPasswordController)

router.get('/test', requireSignIn, isAdmin, testController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update Profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//all orders

router.get('/all-orders',requireSignIn,isAdmin,getAllOrdersController)

//order Update
router.put('/order-status/:orderId',requireSignIn,isAdmin,orderStatusController)

export default router