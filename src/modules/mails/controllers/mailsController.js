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

async function getMails(req) {
    try {
        let {limit,pages,search,sort,sort_order} = req.body;

        const filter = { deleted:'0' };

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }

        const totalItems = await Mail.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;


        const mails = await Mail.find(filter, { projection: {  deleted: 0, _id: 0 } }).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        return { message: 'User Mails', success: true, statusCode: 200, data: notifications ,pagination_data}

    } catch (error) {
        console.log(error.message);
        
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