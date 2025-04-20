import Product from '../models/product.js'; // Product මොඩලය ආයාත කරන්න


// සියලුම නිෂ්පාදන ලබාගන්න
export const getProducts = (_, res) => {
    Product.find()
        .then((products) => {
            res.json({ List: products }); // නිෂ්පාදන ලැයිස්තුව සමඟ ප්‍රතිචාරය කරන්න
        })
        .catch((error) => {
            res.status(500).json({
                message: "නිෂ්පාදන ලබා ගැනීමේ දෝෂයක්",
                error, // ප්‍රතිචාරය තුළ දෝෂ විස්තර ඇතුළත් කරන්න
            });
        });
};





// නව නිෂ්පාදනයක් සාදන්න
export function createProduct(req, res) {

    console.log(req.user);

    if(req.user == null){
        res.json({
            message: "Your not logined",
        });
        return
    }

    if(req.user.type != "admin"){
        res.json({
            message: "Your not admin",
        });
        return
    }

    const product = new Product(req.body); // අයදුම්කරුගේ දත්ත වලින් නිෂ්පාදන වස්තුවක් සාදන්න

    product
        .save()
        .then(() => {
            res.json({
                message: "නිෂ්පාදනය නිර්මාණය කරන ලදී", // සාර්ථක පණිවිඩය
            });
        })
        .catch(() => {
            res.json({
                message: "දෝෂයක්", // දෝෂ පණිවිඩය
            });
        });
}












// නිෂ්පාදනයක් සාදන්න (අනුපිටපත් ක්‍රියාවලිය, ඉවත් කිරීමට හෝ නම වෙනස් කිරීමට සලකා බලන්න)
export function createProductDuplicate(req, res) {
    const product = new Product(req.body); // අයදුම්කරුගේ දත්ත වලින් නිෂ්පාදන වස්තුවක් සාදන්න

    product
        .save()
        .then(() => {
            res.json({
                message: "නිෂ්පාදනය නිර්මාණය කරන ලදී", // සාර්ථක පණිවිඩය
            });
        })
        .catch(() => {
            res.json({
                message: "නිෂ්පාදනය නිර්මාණය කිරීමට අසමත් විය", // දෝෂ පණිවිඩය
            });
        });
}

// නමක් අනුව නිෂ්පාදනයක් මකා දමන්න
export function deleteProductByname(req, res) {
    Product.deleteOne({ name: req.params.name })
        .then(({ deletedCount }) => {
            res.json({
                message: deletedCount ? "නිෂ්පාදනය මකා දමන ලදී" : "නිෂ්පාදනය සොයාගත නොහැක",
            });
        })
        .catch(() => {
            res.json({ message: "නිෂ්පාදනය මකා දැමීම අසාර්ථක විය" });
        });
}

// නමක් අනුව නිෂ්පාදනයක් සොයන්න
export function getProductByName(req, res) {
    Product.find({ name: req.params.name }) // නමක් අනුව ගැලපෙන සියලුම දත්ත සොයන්න
        .then((products) => {
            if (products.length === 0) {
                res.status(404).json({
                    message: "නිෂ්පාදනය සොයාගත නොහැක", // නිෂ්පාදනයක් සොයාගත නොහැකි නම් පණිවිඩය
                });
            } else {
                res.json(products[0]); // පළමු ගැලපෙන නිෂ්පාදනය සමඟ ප්‍රතිචාරය කරන්න
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "දෝෂයක් ඇතිවිය", // දෝෂ පණිවිඩය
                error, // දෝෂ විස්තර ඇතුළත් කරන්න
            });
        });
}



























