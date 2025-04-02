

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