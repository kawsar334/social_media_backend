


const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
     userId: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        default: "",
    },
    likes: {
        type: [String],
        default: []
    },
}, { timestamps: true });

const Story = mongoose.model("Story", StorySchema);
module.exports = Story;
