
const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Database connected"); 
        }) 
        .catch((err) => {  
            console.log("Database not connected:", err); 
        });
}; 

module.exports = connect;  
 
 