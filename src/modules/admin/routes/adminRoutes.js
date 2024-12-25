import express from 'express';
import {
    getDashData
} from '../controllers/adminController.js'; 

const adminRouter = express.Router();

adminRouter.post('/get_dash_data', async (req, res) => {
    try {
        const result = await getDashData();
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default adminRouter;
