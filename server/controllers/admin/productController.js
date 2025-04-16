import { imageUploadUtil } from "../../config/cloudinary.js";
import { Product } from "../../models/product.js";

export const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        console.log(result);

        res.json({
            success: true,
            result,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error occured ",
        });
    }
};

// product related

// add a new product

export const addProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        const newProductCreate = await Product.create({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        });

        res.status(201).json({
            success: true,
            data: newProductCreate
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured ",
        });
    }
};

// fetch all products
export const fetchAllProducts = async (req, res) => {
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured ",
        });
    }
};

// edit a product using _id 
export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        // updating product

        findProduct.title = title !== undefined ? title : findProduct.title;
        findProduct.description = description !== undefined ? description : findProduct.description;
        findProduct.category = category !== undefined ? category : findProduct.category;
        findProduct.brand = brand !== undefined ? brand : findProduct.brand;
        findProduct.price = price !== undefined && price !== '' ? Number(price) : findProduct.price;
        findProduct.salePrice = salePrice !== undefined && salePrice !== '' ? Number(salePrice) : findProduct.salePrice;
        findProduct.totalStock = totalStock !== undefined && totalStock !== '' ? Number(totalStock) : findProduct.totalStock;
        findProduct.image = image !== undefined ? image : findProduct.image;

        await findProduct.save();
        res.status(200).json({
            success: true,
            data: findProduct
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured ",
        });
    }
};
//delete a product using _id 
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findOneAndDelete({ _id: id });
        if (!product) return res.status(404).json({
            success: false,
            message: "Product not available"
        })

        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error occured ",
        });
    }
};
