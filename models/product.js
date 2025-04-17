import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: String, // නම string විදියට ගන්නවා.
    price: Number, // මිල අංකයක් විදියට ගන්නවා.
    description: String, // විස්තර string විදියට ගන්නවා.

});

const Product = mongoose.model("products", productSchema); // "products" collection එකට Product model එක හදනවා.

export default Product // Product model එක export කරනවා. 