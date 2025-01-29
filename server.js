import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paytrRouter from "./routes/paytrRoute.js";

//App Config
const port = process.env.PORT || 3000
const app = express();

connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product' , productRouter)
app.use('/api/cart' , cartRouter)
app.use('/api/order' , orderRouter)
app.use('/api/paytr', paytrRouter);

app.get('/', (req,res)=>{
    res.send("API Working")
})

app.listen(port, ()=> console.log('Server started on PORT : ' + port))