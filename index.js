const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");

const connect = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/post", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/comment", commentRoute);


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error details
    const message = err.message || "SOMETHING WENT WRONG";
    const status = err.status || 500;
    return res.status(status).json({
        message,
        status,
        success: false,
    });
});



const startServer = async () => { 
    try {
        await connect(); // Ensure DB connection
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error);
        process.exit(1);
    }
};

// Invoke the startServer function
startServer();
