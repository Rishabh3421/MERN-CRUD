import express from 'express'
import {CreateProducts, UpdateProduct, DeleteProduct} from '../controllers/Products.js'

const ProductRoutes = express.Router()

ProductRoutes.post('/create/:userID', CreateProducts)
ProductRoutes.put('/update/:id', UpdateProduct)
ProductRoutes.delete('/delete/:id', DeleteProduct)

export default ProductRoutes