import slugify from "slugify";
import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
dotenv.config(); 
 
//payment

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });
export const createProductController = async (req, res) => {

    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should be less than 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while creating product",
            error
        })

    }
};



export const getProductController = async (req, res) => {

    try {
        const products = await productModel.find({}).populate("category"). select("-photo").limit(12).sort({ createdAt: -1 });    
        res.status(200).send({
            success: true,
            counTotal: products.length,
            message: "All products",
            products
        })                
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error
        })
    }
    
}

//get single product

export const getSingleProductController = async (req, res) => {
    try {
        const { slug } = req.params;    
        const product = await productModel.findOne({ slug }).select("-photo").populate("category");
        res.status(200).send({  
            success: true,
            message: "Get Single Product Successfully",
            product
        })
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success: false,
            message: "Error while getting single product",
            error
        })
    }
}

//get photo
export const productPhotoController = async (req, res) => {
    try {
        const product =await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {       
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }   
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting photo",
            error
        })
    }
}

//delete controller
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success: false,
            message: "Error while deleting product",
            error
        })
    }
}

//update controller
export const updateProductController = async (req, res) => {
    try {

        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !category:
                return res.status(500).send({ error: "category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is required and should be less than 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating product",
            error
        })

    }
} 

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
    }
}

// count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in product count",
            error
        })
    }
}

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting products",
            error
        })
    }
}

//search product
export const searchProductController = async (req, res) => {
    try {
        const {keyword} = req.params
        const results = await productModel
            .find({
                $or: [
                    {name: {$regex: keyword, $options: 'i'}},
                    {description: {$regex: keyword, $options: 'i'}}
                ]
            })
            .select("-photo");
        res.status(200).send({
            success: true,
            results
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while searching products",
            error
        })  
    }
}

//similar products
export const realtedProductController = async (req, res) => {
    try {
        const {pid, cid} = req.params
        const products = await productModel
            .find({
                category: cid,
                _id: {$ne: pid}
            })
            .select("-photo")
            .limit(3)
            .populate("category")
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting related products",
            error
        })  
    }
}
//get products by category
export const productCategoryController = async (req, res) => {
    try {
        // Log the incoming slug
        console.log('Received slug:', req.params.slug);

        // Find the category based on the slug
        const category = await categoryModel
            .findOne({ slug: req.params.slug })
            .select("-photo");

        // Check if the category was found
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        console.log('Found category:', category);

        // Find products belonging to that category
        const products = await productModel
            .find({ category: category._id })  // Use category._id instead of just category
            .populate("category")
            .select("-photo")
            .sort({ createdAt: -1 });

        console.log('Found products:', products);

        // Send response with products and category
        res.status(200).send({
            success: true,
            category,
            products
        });
    } catch (error) {
        // Log any error for debugging
        console.error('Error while getting products:', error);
        res.status(500).send({
            success: false,
            message: "Error while getting products",
            error
        });
    }
};

//payment getway API
export const braintreeTokenController = async (req, res) => {
    try {
        //generate token
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

//payment
export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart.map((p) => {total += p.price })


        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if (result) {
                const order = new orderModel({

                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save()

                res.json({ success: true })
                
            } else {
                res.status(500).send(err)
            }
        })
    } catch (error) {
        console.log(error);
    }
}