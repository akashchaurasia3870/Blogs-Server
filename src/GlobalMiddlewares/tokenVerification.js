import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import User from '../modules/users/models/userModal.js';

// Middleware function to authenticate JWT tokens
export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    // console.log(req);
    console.log(req.body, req.file);

    console.log(token);

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.user_id = decoded.user_id;
        console.log(decoded);

        let userCount = await User.countDocuments({ user_id: decoded.user_id })

        console.log("url", req.url, "userCount", userCount);
        if (userCount == 1) {
            next();
        } else {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }
    } catch (err) {
        console.log(err);

        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};

