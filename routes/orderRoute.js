import express from "express";
import {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    updateStatus,
    userOrders,
    verifyStripe, verifyRazorpay
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();
// Admin Features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)
//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)
//User Feature
orderRouter.post('/userorders', authUser, userOrders)
//Verify Payment
orderRouter.post('/verifyStripe' , authUser, verifyStripe)
orderRouter.post('/verifyRazorpay' , authUser, verifyRazorpay)

export default orderRouter;

