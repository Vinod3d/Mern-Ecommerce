import express from 'express'
import connectDB from './db/connectDB.js'
import { APP_PORT, JWT_KEY, MONGO_URI } from './config/index.js';
import userRouter from './routes/userRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import errorHandler from '../../10-Portfolio/Backend/middlewares/errorHandlers.js';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from 'url';


// Create __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(cookieParser(JWT_KEY));

// Routes Middlewares
app.use("/api/user", userRouter);      
app.use("/api/category", categoryRouter);      
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port port`);
        });
    } catch (error) {
        console.log(error);
    }
};
start();