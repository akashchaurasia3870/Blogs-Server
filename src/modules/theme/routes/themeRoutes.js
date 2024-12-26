import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    updateTheme,
    createTheme,
    getTheme
} from '../controllers/themeController.js'; 
import { authMiddleware } from '../../../GlobalMiddlewares/tokenVerification.js';

const themeRouter = express.Router();


themeRouter.post('/get', Logs, async (req, res) => {
    try {
        let {user_id} = req.body ;
        const result = await getTheme(user_id);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


themeRouter.post('/update', Logs, async (req, res) => {
    try {

        let {user_id,updatedValues}  =req.body ;
        const result = await updateTheme(user_id,updatedValues);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


themeRouter.post('/create', Logs, authMiddleware, async (req, res) => {
    try {
        let {user_id} = req.body ;
        const result = await createTheme(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});


export default themeRouter;
