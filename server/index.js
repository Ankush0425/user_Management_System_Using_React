import express from "express";
import cors from "cors"; // Cross origin resource sharing
import { config } from "dotenv"; // access environment variable from .env files
import mongoose from "mongoose";
import { User } from "./model/user.js"
import Routes from './routes/route.js';
import bodyParser from "body-parser";

config({
    path: "./config.env"
});

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "";

const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());

async function connectDatabase() {
    try {
        const database = await mongoose.connect(MONGO_URI, {dbName: "test"});
        console.log("Database connected!");
    } catch (error) {
        console.log(error.message ?? "Failed to connect to database");
    }
}

app.use('/users', Routes);

app.listen(PORT, () => {
    connectDatabase();
    console.log(`Server is running successfully on PORT ${PORT}`)
});