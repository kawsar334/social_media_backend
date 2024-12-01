const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const bodyParser = require("body-parser")
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");
const storyRoute = require("./routes/story");
const connect = require("./db");
const app = express();
const PORT = process.env.PORT || 5000; 

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());

// app.use(cors());


// app.use(cors({
//     origin: [
//         'https://sprightly-custard-753149.netlify.app/',
//         'http://localhost:3000' 
//     ],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
// }));

app.options('*', cors({
    origin: 'https://sprightly-custard-753149.netlify.app',
    credentials: true,
}));

app.use(
    cors({
        origin: 'https://sprightly-custard-753149.netlify.app',
        credentials: true,
    }
)
);


app.options('/api/auth/login', cors({
    origin: 'https://sprightly-custard-753149.netlify.app',
    credentials: true,
}));

// all Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.use("/api/story", storyRoute);



// Global error handling middleware
app.use((err, req, res, next) => {
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
