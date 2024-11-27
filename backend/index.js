import express from "express"
import dotenv from "dotenv"
import Db from "./libs/db.js"
import AuthRoutes from "./routes/Auth.js"
import ProductRoutes from "./routes/Products.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 9000

// Initialize middleware
app.use(express.json())

// Connect to database
Db()

// Routes
app.use('/auth', AuthRoutes)
app.use('/product', ProductRoutes)
app.get("/", (req, res) => {
    res.send("Hello from backend")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})