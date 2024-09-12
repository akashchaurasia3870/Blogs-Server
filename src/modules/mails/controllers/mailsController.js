import CustomError from '../../../customErrors/CustomError.js'
import { Mail, MailVerfication } from '../models/mailsModel.js';

import { getTheme } from '../../theme/controllers/themeController.js';
import User from '../../users/models/userModal.js';
import { sendEmails } from '../middlewares/mailsMiddleware.js';

async function sendMail(req) {
    try {

        console.log("SEND MAIL");
        
        let {content,subject,user_id,receiver_user_id,email} = req.body;

        // await sendEmails(email,subject,content);

        let newMails = new Mail({
            subject,
            content,
            sender_user_id:user_id,
            receiver_user_id:receiver_user_id
        })

        console.log(newMails);

        await newMails.save();

        return { message: 'Mail Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function sendVerificationMail(mail,code,user_id) {
    try {

        let newMails = new MailVerfication({
            user_id,
            code,
        })

        console.log(newMails);

        await newMails.save();

        await sendEmails(mail,"Verification Mail",`Verification Code ${code} valid for 15 min`);

        return { message: 'Mail Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function sendMassMail(req) {
    try {

        let {content,subject,user_id,receiver_user_id,email} = req.body;

        await sendEmails(email,subject,content);

        let newMails = new Mail({
            subject,
            content,
            sender_user_id:user_id,
            receiver_user_id:receiver_user_id
        })

        console.log(newMails);

        await newMails.save();

        return { message: 'Mail Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getMails(req,limit='') {
    try {
        let { search ,option } = req.body;

        const filter = { deleted:'0' };
        const mails = await Mail.find(filter, { projection: {  deleted: 0, _id: 0 } });

        return { message: 'User Mails', success: true, statusCode: 200, data: mails }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getMailsById(req) {
    try {
       
        let { author_id } = req.body;
        console.log("Find Blog By User ID ",author_id);

        const filter = { user_id : author_id};
        const blogs_data = await Blog.find(filter, { projection: { deleted: 0, _id: 0 } });

        console.log(filter);
        
        const user_data = await User.findOne(filter);
        console.log(user_data);
        
        
        return { message: 'User Mailss', success: true, statusCode: 200, data: {blogs_data,user_data} }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export { getMails, sendMail, sendMassMail,getMailsById,sendVerificationMail };