
const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import CORS middleware
const connect = require("./db");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const swaggerSpec = require('./swagger'); // Import Swagger spec

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

// Global error handling middleware
app.use((err, req, res, next) => {
    const message = err.message || "Something went wrong";
    const status = err.status || 500;
    return res.status(status).json({
        message,
        status,
        success: false,
    });
});

// Connect to the database
connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// const express = require("express");
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const cors = require("cors"); // Import CORS middleware
// const connect = require("./db");
// const authRoute= require("./routes/auth");
// const userRoute = require("./routes/user");
// const postRoute = require("./routes/post");
// const commentRoute = require("./routes/comment");


// const app = express();
// const PORT = process.env.PORT || 3000;


// app.use(express.json());
// app.use(cookieParser())
// app.use(cors()); // Enable CORS for all routes
// app.use("/api/auth",authRoute);
// app.use("/api/user", userRoute);
// app.use("/api/post", postRoute);
// app.use("/api/comment", commentRoute);

// // 
// app.use((err, req, res, next) => {
//     const message = err.message || "Something went wrong";
//     const status = err.status || 500;
//     return res.status(status).json({
//         message,
//         status,
//         success: false,
//     });
// });

// connect();

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
