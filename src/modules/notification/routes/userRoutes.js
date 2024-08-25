import express from 'express';
import {
    SignUpNewUser,
    SignInUser,
    VerifyUser,
    ResetUserPassword,
    SignUpUserUsingGoogle,
    SignInUserUsingGoogle,
    SignOutUser
} from '../controllers/userController.js'; // Adjust the path based on your project structure

const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await SignUpNewUser({ username, email, password });
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signin
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await SignInUser(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// PUT /api/users/:userId/verify
router.put('/:userId/verify', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await VerifyUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/users/:userId/reset-password
router.post('/:userId/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const result = await ResetUserPassword(email, newPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signup/google
router.post('/signup/google', async (req, res) => {
    try {
        const googleUserData = req.body;
        const result = await SignUpUserUsingGoogle(googleUserData);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signin/google
router.post('/signin/google', async (req, res) => {
    try {
        const { googleUserId } = req.body;
        const result = await SignInUserUsingGoogle(googleUserId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

// POST /api/signout/:userId
router.post('/signout/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await SignOutUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
});

export default router;
