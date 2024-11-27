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
    const ProductID = req.params.id;
    const { title, description, price, image } = req.body;

    const FindProduct = await ProductModel.findById(ProductID);

    if (!FindProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found",
      });
    }

    const UpdateProduct = await ProductModel.findByIdAndUpdate(
     ProductID,
      {
        title: title || FindProduct.title,
        description: description || FindProduct.description,
        price: price || FindProduct.price,
        image: image || FindProduct.image,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      data: UpdateProduct,
    })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const DeleteProduct = async (req, res) => {
    try {
        const ProductID = req.params.id;

        const FindProduct = await ProductModel.findById(ProductID);

        if (!FindProduct) {
            return res.status(404).json({
                success: false,
                msg: "Product not found",
            });
        }
        
        const DeleteProduct = await ProductModel.findByIdAndDelete(ProductID);
        
        return res.status(200).json({
            success: true,
            msg: "Product deleted successfully",
            data: DeleteProduct,
        });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error",
        });
    }
};

export { CreateProducts, UpdateProduct, DeleteProduct };
