import express from 'express'
import connectDB from './db/connectDB.js'
import { APP_PORT, JWT_KEY, MONGO_URI } from './config/index.js';
import userRouter from './routes/userRouter.js'
import errorHandler from '../../10-Portfolio/Backend/middlewares/errorHandlers.js';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT || 3000
app.use(express.json());
app.use(cookieParser(JWT_KEY));


app.use("/api/user", userRouter);      
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