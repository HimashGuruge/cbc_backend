import express from "express"; // Express ගේනවා. මේකෙන් වෙබ් server එක හදන්න පුළුවන්.
import bodyParser from "body-parser"; // Body Parser ගේනවා. එන දත්ත ලේසියෙන් ගන්න උදව් වෙනවා.
import mongoose from "mongoose"; // Mongoose ගේනවා. MongoDB එක්ක ලේසියෙන් වැඩ කරන්න උදව් වෙනවා.


import productRouter from "./routes/productRouter.js"; // Product Router එක import කරගන්නවා. මේකෙන් API එකේ routes එකක් හදන්න පුළුවන්.

import jwt from "jsonwebtoken";
import {} from "./function.js"; // function.js එක import කරගන්නවා. මේකෙන් function එකක් import කරගන්න පුළුවන්.

import userRouter from "./routes/userRouter.js";
const app = express(); // Express එකෙන් app එකක් හදනවා. මේක තමයි server එක.
app.use(bodyParser.json());
const mongoUrl =
  "mongodb+srv://admin:123@cluster0.t1maali.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// MongoDB එක්ක සම්බන්ධ වෙන්න URL එක. database එකට යන්න ලිපිනය ලියලා තියෙනවා.

mongoose.connect(mongoUrl, {}); // MongoDB එක්ක සම්බන්ධ වෙන්න Mongoose එක භාවිතා කරනවා.

const connection = mongoose.connection; // Mongoose එකේ connection එක ගබඩා කරනවා.

connection.once("open", () => {
  // Database එක connect උනාම එක පාරක් වැඩ කරනවා.
  console.log("Database Connected"); // "Database Connected" කියලා පෙන්නනවා.
});



app.use((req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token:", token); // Token print කරන්න

  if (token != null) {
    jwt.verify(token, "i love you", (error, decoded) => {
      if (!error) {
        console.log("Decoded Token:", decoded); // token decoded කරන්න
        req.user = decoded;
      } else {
        console.log("Token verify error:", error.message); // Error print කරන්න
      }
      next(); // next() function එක call වෙන එක ensure කරන්න
    });
  } else {
    next(); // token null නම් next() call කරන්න
  }
});




app.use("/api/products", productRouter); // "/products" කියන ලිපිනයට productRouter එක යවනවා.

app.use("/api/users", userRouter);

app.listen(5000, () => {
  // Server එක 3000 port එකේ ලෑස්ති කරලා ගමන් යනවා.
  console.log("server is running on port 5000"); // "server එක 3000 එකේ යනවා" කියලා පෙන්නනවා.
});
  