import express from 'express';
import { createOrder, getOrders } from '../controller/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/", getOrders); // Define a GET request route to get all orders.


export default orderRouter;