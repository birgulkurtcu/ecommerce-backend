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
import path, {dirname} from "path";
import ejsLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';

// PAYTR

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = path.join(__dirname, '/app_server/views');
console.log("viewsPath", viewsPath);



//App Config
const port = process.env.PORT || 3000
const app = express();

connectDB()
connectCloudinary()

app.set('views', path.join(__dirname, '/app_server/views'));

app.use(express.urlencoded({ extended: true }));

app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(ejsLayouts);

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