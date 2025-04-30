import Product from '../models/product.js';
import { isAdmin } from '../controller/userController.js'; // isAdmin function එක ආනයනය කරනවා.

export function createProduct(req, res) {

    if (!isAdmin(req)) {
        res.json({
            message: "please login as administor to create product"
        });
        return;
    }

    const product = new Product(req.body); // <-- මෙතනදී req.body යවන්න ඕන.

    product.save().then(
        () => {
            res.json({
                message: "Product Created", // සාර්ථක පණිවිඩයක් JSON ආකාරයෙන් යවනවා.
            });
        }
    ).catch((err) => {
        res.json({
            message: err.message // දෝෂයක් ඇතිවුවහොත් එය JSON ආකාරයෙන් යවනවා.
        });
    });
}

export function getProduct(req, res) {
    Product.find().then((productList) => {
        res.json({
            list: productList // productList එක JSON ආකාරයෙන් පිළිතුර යවනවා.
        });
    });
}
