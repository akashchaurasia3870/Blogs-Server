import { Blog } from "../../blogs/models/blogModel.js";
import { Mail } from "../../mails/models/mailsModel.js";
import { Notification } from "../../notification/models/notificationModel.js";
import User from "../../users/models/userModal.js";

const getDashData = async (limit=3,pages=1,search='',sort='date_entered',sort_order)=> {
    try {
        
        const filter = {deleted:0};
        

        const blogs = await Blog.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .limit(limit);
        const totalBlogCount = await Blog.countDocuments(filter);


        const users = await User.find(filter,{ projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
        .sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .limit(limit);
        const totalUserCount = await User.countDocuments(filter);


        const notifications = await Notification.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .limit(limit);
        const totalNotificationCount = await Notification.countDocuments(filter);


        const mails = await Mail.find(filter, { projection: {  deleted: 0, _id: 0 } })
        .sort({ [sort]: sort_order === 'asc' ? 1 : -1 })
        .limit(limit);
        const totalMailCount = await Mail.countDocuments(filter);


        

        return { message: 'Blogs Data', success: true, statusCode: 200, data: [{blogs,totalBlogCount},{users,totalUserCount},{notifications,totalNotificationCount},{mails,totalMailCount}] }

    } catch (error) {
        console.log(error.message);
        
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export {getDashData};