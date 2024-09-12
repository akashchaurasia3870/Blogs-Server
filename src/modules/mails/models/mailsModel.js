import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';



const mailSchema = new mongoose.Schema({
    mail_id: {
        type: String,
        default: uuidv4()
    },
    sender_user_id: {
        type: String,
        required: true
    },
    receiver_user_id: {
        type: String,
        required: true
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
        type: Number,
        default: 0
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

const mailVerfication = new mongoose.Schema({
    mail_verification_id:{
        type:String,
        default:uuidv4()
    },
    user_id:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default: Date.now
    }
})

const Mail = mongoose.model('mails', mailSchema);
const MailVerfication = mongoose.model('mailsVerfication', mailVerfication);

export { Mail,MailVerfication };
