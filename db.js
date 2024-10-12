


const mongoose = require("mongoose");

const connect = () => {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Database connected");
        })
        .catch((err) => {
            console.log("Database not connected:", err);
        });
};

module.exports = connect;



// const mongoose = require("mongoose");



// const connect = ()=>{
//     mongoose.connect("mongodb://localhost:27017/fullstack_ecommerce?directConnection=true",{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(()=>{
//         console.log("database connected") 
//     }).catch((err)=>{
//         console.log("database not connected");
//     })

// }


// module.exports = connect ;
