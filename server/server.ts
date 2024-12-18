require('dotenv').config();
import express, { Request, Response } from 'express';

import { errorHandler } from './src/middleware/handleException';
import { connectDb } from './src/models/ConnectDb';
import { appConfig } from './src/configs/AppConfig';
import { routers } from './src/routers/router';


const app = express();


appConfig(app);
app.use(errorHandler);
connectDb(app);
routers(app);



const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
})