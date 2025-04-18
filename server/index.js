

import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; 

// load env variables from .env file
dotenv.config();

// initialize express app
const app = express();

// enable Cors to let front and backend talk to each other
app.use(cors());

// enable json parsing for incoming
app.use(express.json());

// test route to check if server is running
app.get("/", (req, res) => {
    res.send("Server is running");
    });


// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB");

    // start server
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => console.error("MongoDB connection error:", err));
