const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connect = require("./db");
const postRoute= require("./routes/post")
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors()); 

app.use("/api/post", postRoute);



app.listen(PORT, () => {
    connect(); 
    console.log(`Server running on port ${PORT}`);
}); 
