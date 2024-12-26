import express from 'express';
import Logs from '../../../logs/logs.js'
import {
    SignUpNewUser,
    SignInUser,
    VerifyUser,
    ResetUserPassword,
    SignUpUserUsingGoogle,
    SignInUserUsingGoogle,
    SignOutUser,
    UpdateUserDetails,
    UserDetails,
    UsersDetails,
    getAuthors
} from '../controllers/userController.js'; // Adjust the path based on your project structure
import { authMiddleware } from '../../../GlobalMiddlewares/tokenVerification.js';

const userRouter = express.Router();

// POST /api/signup
userRouter.post('/signup', Logs, async (req, res) => {
    try {
        const result = await SignUpNewUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signin
userRouter.post('/signin', Logs, async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await SignInUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signin
userRouter.post('/get_user', Logs, authMiddleware, async (req, res) => {
    try {
        const result = await UserDetails(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_users', Logs, authMiddleware, async (req, res) => {
    try {
        const result = await UsersDetails(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

userRouter.post('/get_author', Logs, authMiddleware, async (req, res) => {
    try {
        const result = await getAuthors(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});
// POST /api/signin
userRouter.post('/update_user', Logs, authMiddleware, async (req, res) => {
    try {
        const result = await UpdateUserDetails(req, res);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/users/verify
userRouter.post('/verify', Logs, async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const result = await VerifyUser(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/users/:user_id/reset-password
userRouter.post('/reset-password', Logs, async (req, res) => {
    try {
        const { user_id, password } = req.body;
        const result = await ResetUserPassword(user_id, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signup/google
userRouter.post('/signup/google', Logs, async (req, res) => {
    try {
        const googleUserData = req.body;
        const result = await SignUpUserUsingGoogle(googleUserData);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signin/google
userRouter.post('/signin/google', Logs, async (req, res) => {
    try {
        const { googleuser_id } = req.body;
        const result = await SignInUserUsingGoogle(googleuser_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signout/:user_id
userRouter.post('/signout/:user_id', Logs, async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const result = await SignOutUser(user_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default userRouter;
