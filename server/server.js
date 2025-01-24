import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import './config/instrument.js';
import { clerkWebhooks } from './controllers/webhooks.js';


//ini express
const app = express()


//connect to db
await connectDB()


//middlewares
app.use(cors())
app.use(express.json())

//routes
app.get('/',(req,res)=> res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
   throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks);
 
//port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,()=>{
   console.log(`Server is running on port ${PORT}`);
});



