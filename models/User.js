


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
      
    },
    cpassword: {
        type: String,
        required: [true, "password is required"],
       
    },
    avatar: {
        type: String,
        default: ""
    },
    notifications: {
        type: [String],
        default: []
    },
    seenNotification: {
        type: [String],
        default: []
    }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
