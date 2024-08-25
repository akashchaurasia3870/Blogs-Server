
import CustomError from '../../../customErrors/CustomError.js'
import { Chat, Message } from '../models/chatModel.js';

async function createChat(data) {
    try {

        let { user1_id, user2_id, message, } = data;
        let newMessage = new Message({
            content: message,
            sendBy: user1_id,
        })
        let new_msg = await newMessage.save();

        let newChat = new Chat({
            participents: [user1_id, user2_id],
            messages: [new_msg.message_id],
            chat_started_by: user1_id
        })

        let result = await newChat.save();

        return { message: 'New Chat Added Successfully', success: true, statusCode: 201, chat: result };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function addParticipents(data) {
    try {
        let { user_id, chat_id } = data;
        const filter = { chat_id };
        // const update = { $set: { caption } };
        const chat = await Chat.findOne(filter);
        chat.participents.push(user_id);
        await chat.save();
        return { message: 'Add New Participant Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function removeParticipents(data) {
    try {
        let { user_id, chat_id } = data;
        const filter = { chat_id };
        // const update = { $set: { caption } };
        const chat = await Chat.findOne(filter);
        chat.participents = chat.participents.filter(users => users !== user_id);
        await chat.save();
        return { message: 'Remove Participant Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function insertNewMessage(data) {
    try {
        let { user_id, message, chat_id } = data;

        let newMessage = new Message({
            content: message,
            sendBy: user_id,
        })

        let new_msg = await newMessage.save();

        const filter = { chat_id };
        // const update = { $set: { caption } };
        const chat = await Chat.findOne(filter);
        chat.messages.push(new_msg.message_id);
        await chat.save();
        return { message: 'Add New Message Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function updateMessage(data) {
    try {
        let { content, message_id } = data;
        const filter = { message_id };
        // const update = { $set: { caption } };
        let msgObj = await Message.findOne(filter);
        msgObj.content = content;
        await msgObj.save();
        return { message: 'Update Message Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function deleteMessage(data) {
    try {
        let { user_id, message_id } = data;
        const filter = { message_id };
        // const update = { $set: { caption } };
        const message = await Message.findOne(filter);
        message.deleted = '1';
        await message.save();
        return { message: 'Message Deleted Successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getChat(data) {
    try {
        // Find Post By User ID 
        let { user_id } = data;
        const filter = { user_id };
        const chats = await Chat.find(filter);
        return { message: 'User Posts', success: true, statusCode: 200, data: blogs }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

export {
    createChat,
    addParticipents,
    removeParticipents,
    deleteMessage,
    updateMessage,
    insertNewMessage
}