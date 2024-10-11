


const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLngth:[30, ""]
    },
    desc:{
        type: String,
        required: true,
        maxLngth: [30, ""]  
    },
    userId:{
        type: String,
        required: true,
    
    },
    images:{
        type:[String],
        default:[],
    },
    likes:{
        type:[String],
        default:[]
    },
    unlikes:{
        type: [String],
        default: []
    },
    comments:{
        type: [String],
        default: []  
    }


}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
