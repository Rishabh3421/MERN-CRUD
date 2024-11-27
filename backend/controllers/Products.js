import ProductModel from "../models/Products.js";

const CreateProducts = async (req, res) => {
    try {
        const UserID = req.params.userID;
        const { title, description, price, image } = req.body;

        // Validate input fields
        if (!title || !description || !price || !image || !UserID) {
            return res.status(400).json({
                success: false,
                msg: "Please provide all required fields",
            });
        }

        // Create a new product instance
        const product = new ProductModel({
            title,
            description,
            price,
            image, 
            UserID,
        });

        // Save the product to the database
        await product.save();
        res.status(201).json({
            success: true,
            msg: "Product Created Successfully",
            data: product,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};

const UpdateProduct = async (req, res) => {
    try {
        const { id, title, description, price, image } = req.body;

        // Validate product ID
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "Product ID is required"
            });
        }

        // Find product and validate existence
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }

        // Update product fields if provided
        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (image) product.image = image;

        // Save updated product
        await product.save();

        res.status(200).json({
            success: true,
            msg: "Product Updated Successfully",
            data: product
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};


export { CreateProducts, UpdateProduct };
