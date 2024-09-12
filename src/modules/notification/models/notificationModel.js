import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const notificationSchema = new mongoose.Schema({
    notification_id: {
        type: String,
        default: uuidv4()
    },
    sender_user_id: {
        type: String,
        required: true
    },
    receiver_user_id: {
        type: String,
    },
    content: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        required: false
    },
    subject: {
        type: String,
        default: ''
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('notifications', notificationSchema);

export { Notification };
