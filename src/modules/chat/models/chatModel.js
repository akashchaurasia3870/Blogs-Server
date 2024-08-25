import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from 'uuid';


const messageSchema = new Schema({

    message_id: {
        type: String,
        required: true,
        default: uuidv4()
    },
    content: {
        type: String,
        required: true
    },
    sendBy: {
        type: String,
        required: true,
        ref: 'User',
    },
    date_entered: {
        type: Date,
        default: new Date().toISOString()
    },
    date_modified: {
        type: Date,
        default: new Date().toISOString()
    },
    deleted: {
        type: String,
        default: '0'
    },

});
const chatSchema = new Schema({

    chat_id: {
        type: String,
        required: true,
        default: uuidv4()
    },

    participents: {
        type: [String],
        default: []
    },

    messages: {
        type: [String],
        default: []
    },

    date_started: {
        type: Date,
        default: new Date().toISOString()
    },
    date_deleted: {
        type: Date,
        default: ""
    },

    chat_deleted: {
        type: String,
        default: '0'
    },

    chat_started_by: {
        type: String,
        required: true,
        ref: 'User'
    }
});


const Chat = mongoose.model('chat', chatSchema);
const Message = mongoose.model('message', messageSchema);

export { Chat, Message }

