const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    members: {
        type: [String],  // Array of user IDs
        required: true,
    },
    lastMessage: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;
