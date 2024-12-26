import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    createChat,
    addParticipents,
    removeParticipents,
    deleteMessage,
    updateMessage,
    insertNewMessage
} from '../controllers/chatController.js';

import handleUploads from '../../../GlobalMiddlewares/fileUpload.js'
const chatRouter = express.Router();

chatRouter.post('/create', Logs, async (req, res) => {
    try {
        const result = await createChat(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

chatRouter.post('/addParticipents', Logs, async (req, res) => {
    try {
        const result = await addParticipents(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

chatRouter.post('/removeParticipents', Logs, async (req, res) => {
    try {
        const result = await removeParticipents(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

chatRouter.post('/insertMessage', Logs, handleUploads, async (req, res) => {
    try {
        const result = await insertNewMessage(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

chatRouter.post('/updateMessage', Logs, async (req, res) => {
    try {
        const result = await updateMessage(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

chatRouter.post('/deleteMessage', Logs, async (req, res) => {
    try {
        const result = await deleteMessage(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default chatRouter;
