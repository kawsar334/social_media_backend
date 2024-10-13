const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./db");
const Post = require("./models/Post")

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); 


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

// Add a simple GET request
app.get("/find/:id", async (req, res) => {

    const id = "63d4a6a334b257a3561b93b2"

    try {

        const post = await Post.findById(req.params.id)
        res.json({
            message: "Hello World!",
            success: true,
            data: post,
        });
        console.log(post)

    } catch (err) {
        res.status(500).json({
            message: "Server Error",
            success: false,
        });
    }


});
connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
