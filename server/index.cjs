const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

// load env variables from .env file
dotenv.config();

// initialize express app
const app = express();

// enable Cors to let front and backend talk to each other
app.use(cors());

// enable json parsing for incoming
app.use(express.json());

const playlistRoutes = require("./routes/playlistRoutes");
// use playlist routes
console.log("✅ Playlist route registered at /api/playlists");
app.use("/api/playlists", playlistRoutes);

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


