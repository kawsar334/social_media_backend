const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const postRoute = require("./routes/post");
const connect = require("./db");

const PORT = process.env.PORT || 5000; 

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/post", postRoute);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// Start server after DB connection is established
const startServer = async () => {
    try {
        await connect(); 
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1); 
    }   
}; 
 
startServer();
