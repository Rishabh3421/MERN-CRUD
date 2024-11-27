import express from 'express'
import {CreateProducts, UpdateProduct} from '../controllers/Products.js'

const ProductRoutes = express.Router()

ProductRoutes.post('/create/:userID', CreateProducts)
ProductRoutes.put('/update', UpdateProduct)

export default ProductRoutes