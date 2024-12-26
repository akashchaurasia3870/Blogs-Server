import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    getNotifications, sendNotification, sendMassNotification,
    getNotificationsById,replyNotification
} from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.post('/get', Logs, async (req, res) => {
    try {
        const result = await getNotifications(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

notificationRouter.post('/send', Logs, async (req, res) => {
    try {
        const result = await sendNotification(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

notificationRouter.post('/reply', Logs, async (req, res) => {
    try {
        const result = await replyNotification(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

notificationRouter.post('/send_mass_notification', Logs, async (req, res) => {
    try {
        const result = await sendMassNotification(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

notificationRouter.post('/author_notification', Logs, async (req, res) => {
    try {
        const result = await getNotificationsById(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default notificationRouter;
