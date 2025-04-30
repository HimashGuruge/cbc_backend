import Order from "../models/order.js"; // Order මොඩල් එක ගන්නවා
import { isCustomer } from "./userController.js";


export async function createOrder(req, res) {

    if(!isCustomer) {
        res.json({
            message: "please login as customer to create order"
        });
        return;
    }



  try {
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1); // ලේටස්ට් ඔඩර් එක හොයනවා
    let orderId;

    if (latestOrder.length == 0) {
      orderId = "CBC0001"; // ඔඩර් නැත්නම් පළවෙනි ID එක
    } else {
      const currentOrderId = latestOrder[0].orderId; // ලේටස්ට් ඔඩර් ID එක ගන්නවා

      const numberString = currentOrderId.replace("CBC", ""); // "cbc" ඉවත් කරනවා
      const number = parseInt(numberString); // අංකයක් බවට පරිවර්තනය කරනවා

      const newNumber = (number + 1).toString().padStart(4, "0"); // අංකය එකක් වැඩි කරනවා සහ 4 අංකයක් බවට පරිවර්තනය කරනවා

      orderId = "CBC" + newNumber; // නව ID එක සාදනවා


    }


    const newOrderData = req.body; // නව ඔඩර් දත්ත ගන්නවා

     newOrderData.orderId = orderId; // නව ඔඩර් ID එක යොදනවා

     newOrderData.email = req.user.email; // යූසර්ගේ ඊමේල් එක යොදනවා

     const order = new Order(newOrderData); // නව ඔඩර් වස්තුවක් සාදනවා
     await order.save(); // ඔඩර් එක සුරකිනවා

     return res.status(201).json({ message: "Order Created", order });



  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "ලේටස්ට් ඔඩර් ගන්න බැරිවුණා" }); // එරර් එකක් ආවොත් මැසේජ් යවනවා
  }
}


//get all orders

export async function getOrders(req, res) {
    try {
        const orders = await Order.find(); // ඔඩර්ස් එක හොයනවා
        return res.status(200).json(orders); // ඔඩර්ස් එක යවනවා
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error getting orders" }); // එරර් එකක් ආවොත් මැසේජ් යවනවා
    }
    }

    