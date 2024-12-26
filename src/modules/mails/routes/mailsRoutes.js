import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    getMails, sendMail, sendMassMail,
    getMailsById
} from '../controllers/mailsController.js';

const mailRouter = express.Router();

mailRouter.post('/get', Logs, async (req, res) => {
    try {
        const result = await getMails(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

mailRouter.post('/send', Logs, async (req, res) => {
    try {
        const result = await sendMail(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

mailRouter.post('/send_mass_mail', Logs, async (req, res) => {
    try {
        const result = await sendMassMail(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});

mailRouter.post('/author_mail', Logs, async (req, res) => {
    try {
        const result = await getMailsById(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(error.statusCode || 500).json({ message: error.message });
    }
});


export default mailRouter;
