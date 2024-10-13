const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./db");
const Post = require("./models/Post")
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/user");
// const postRoute = require("./routes/post");
// const commentRoute = require("./routes/comment");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes

// Add a simple GET request
app.get("/", async(req, res) => {

    try{

    const post = await Post.find();
    res.json({
        message: "Hello World!",
        success: true,
        data: post,
    });
    console.log(post)

    }catch(err){
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }


});

// Global error handling middleware
// app.use((err, req, res, next) => {
//     const message = err.message || "Something went wrong";
//     const status = err.status || 500;
//     return res.status(status).json({
//         message,
//         status,
//         success: false,
//     });
// });

// Connect to the database
connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
