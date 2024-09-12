import CustomError from '../../../customErrors/CustomError.js'
import { Notification } from '../models/notificationModel.js';

import { getTheme } from '../../theme/controllers/themeController.js';
import User from '../../users/models/userModal.js';

async function sendNotification(req) {
    try {

        console.log("SEND MAIL");

        console.log(req.body);
        
        
        let {message,subject,email,user_id} = req.body;

        let newNotifications = new Notification({
            subject,
            content:message,
            sender_user_id:user_id,
            receiver_user_id:'',
        })

        console.log(newNotifications);

        await newNotifications.save();

        return { message: 'Notification Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function replyNotification(req) {
    try {

        console.log("SEND MAIL");
        
        let {content,subject,user_id,receiver_user_id,enotification} = req.body;

        let newNotifications = new Notification({
            subject,
            content,
            sender_user_id:user_id,
            receiver_user_id:receiver_user_id
        })

        console.log(newNotifications);

        await newNotifications.save();

        return { message: 'Notification Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function sendMassNotification(req) {
    try {

        let {content,subject,user_id,receiver_user_id,enotification} = req.body;

        let newNotifications = new Notification({
            subject,
            content,
            sender_user_id:user_id,
            receiver_user_id:receiver_user_id
        })

        console.log(newNotifications);

        await newNotifications.save();

        return { message: 'Notification Send Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getNotifications(req,limit='') {
    try {

        console.log(req.body);
        

        let {limit,pages,search,sort,sort_order} = req.body;

        
        const filter = { 
            deleted:'0'
        };

        if(search!=''){
            filter = { 
                deleted:'0' ,
                $or: [
                    { title: { $regex: search, $options: 'i' } }, // Case-insensitive search on title
                    { content: { $regex: search, $options: 'i' } } // Case-insensitive search on content
                ]
            };
        }

        const totalItems = await Notification.countDocuments(filter);

        const totalPages = Math.ceil(totalItems / limit); // ceil to ensure rounding up

        // Ensure the page is within bounds
        pages = Math.max(1, Math.min(pages, totalPages)); // Page can't be less than 1 or more than totalPages

        // Calculate the number of items to skip based on the current page
        const skip = (pages - 1) * limit;

        const notifications = await Notification.aggregate([
            {
                $lookup: {
                    from: "users",           // Name of the User collection
                    localField: "sender_user_id",   // Field in the Notification collection
                    foreignField: "user_id",     // Corresponding field in the User collection
                    as: "user_details",      // The name of the output array field
                    pipeline: [
                        {
                            $project: {
                                _id: 0,      // Exclude the _id field
                                username: 1,     // Include the name field
                                userImage: 1       // Include the img field
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$user_details"     // Deconstruct the array to return individual documents
            }
        ]).sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limit);

        // console.log(notifications);

        let pagination_data = {
            currentPage: pages,
            totalPages: totalPages,
            totalItems: totalItems
        }

        console.log(pagination_data);
        

        return { message: 'User Notifications', success: true, statusCode: 200, data: notifications ,pagination_data}

    } catch (error) {
        console.log(error);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getNotificationsById(req) {
    try {
       
        let { author_id } = req.body;
        console.log("Find Blog By User ID ",author_id);

        const filter = { user_id : author_id};
        const blogs_data = await Blog.find(filter, { projection: { deleted: 0, _id: 0 } });

        console.log(filter);
        
        const user_data = await User.findOne(filter);
        console.log(user_data);
        
        
        return { message: 'User Notificationss', success: true, statusCode: 200, data: {blogs_data,user_data} }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export { getNotifications, sendNotification, sendMassNotification,getNotificationsById,replyNotification };