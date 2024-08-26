import bcrypt from 'bcrypt';
import User from '../models/userModal.js';
import CustomError from '../../../customErrors/CustomError.js'; // 
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { createTheme } from '../../theme/controllers/themeController.js';

const jwtSecret = process.env.ACCESS_TOKEN_SECRET; // Replace with your actual JWT secret key
const jwtExpiresIn = '60m'; // JWT expiration time, e.g., '1d' for 1 day

const SignUpNewUser = async (userData) => {
    try {
        const { username, email, password } = userData;

        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                message: "User Already Exists With This Mail Please Login",
                success: true,
                statusCode: 204
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 11);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            roles: ['user'] // Default role
        });

        // Save user to database
        await newUser.save();
        createTheme(newUser.user_id);

        const token = jwt.sign({ user_id: newUser.user_id }, jwtSecret, { expiresIn: jwtExpiresIn });

        return { message: 'User Signed Up successfully', success: true, statusCode: 201, token };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};

const SignInUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } });
        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { message: 'Incorrect Password', success: true, statusCode: 204 }
        }

        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, { expiresIn: jwtExpiresIn });


        // Return user or token for authentication
        return { message: 'User SignIn Successfully', success: true, statusCode: 200, token, data: user }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};
const UserDetails = async (req, res) => {
    try {
        // Find user by email

        console.log(req.body);


        const user = await User.findOne({ user_id: req.body.user_id }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } });
        if (!user) {
            return {
                message: "User Not Found For This Email",
                success: true,
                statusCode: 404
            }
        }



        // Return user or token for authentication
        return { message: 'User Data', success: true, statusCode: 200, data: user }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const getAuthors = async (req, res) => {
    try {
        // Extract limit from the request body
        const limit = req.body.limit || 10; // Default limit to 10 if not provided

        console.log('Limit:', limit);

        // Retrieve users based on the provided limit
        const users = await User.find({ deleted: 0 }, { projection: { _id: 0, deleted: 0, verified: 0, roles: 0, googleid: 0 } })
            .limit(limit)
            .exec();

        if (!users || users.length === 0) {
            return res.status(404).json({
                message: "No users found",
                success: false,
                statusCode: 404
            });
        }

        // Return the list of users
        return {
            message: 'Users retrieved successfully',
            success: true,
            statusCode: 200,
            data: users
        };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};


const UpdateUserDetails = async (req, res) => {
    try {
        // Assuming user_data contains a unique identifier like email or userId
        const filter = { email: req.body.email }; // Replace with userId or another unique field if needed

        const update = {
            username: req.body.username,
            blogsNo: 0,
            mobileNo: req.body.phone,
            address: req.body.address.country,
            userImage: req.body.userImage,
        };

        const updatedUser = await User.findOneAndUpdate(filter, update, {
            new: true, // Returns the updated document
            upsert: true, // Creates a new document if no match is found
        });

        console.log('User updated successfully:', updatedUser);
        // return updatedUser;

        // Return user or token for authentication
        return { message: 'User Details Updated Successfully', success: true, statusCode: 200, data: updatedUser }
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user', error.statusCode || 500);
    }
};

const VerifyUser = async (user_id) => {
    try {
        // Implement verification logic
        const filter = { user_id };
        const update = { $set: { verified: true } };
        await User.updateOne(filter, update)
        return { message: 'User verified successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error verifying user', error.statusCode || 500);
    }
};

const ResetUserPassword = async (user_id, password) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 11);

        const filter = { user_id };
        const update = { $set: { password: hashedPassword } };
        await User.updateOne(filter, update)
        return { message: 'Password updated successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error resetting password', error.statusCode || 500);
    }
};

const SignUpUserUsingGoogle = async (googleUserData) => {
    try {
        // Implement Google sign-up logic
        return { message: 'User signed up using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user using Google', error.statusCode || 500);
    }
};

const SignInUserUsingGoogle = async (googleuser_id) => {
    try {
        // Implement Google sign-in logic
        return { message: 'User signed in using Google successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing in user using Google', error.statusCode || 500);
    }
};

const SignOutUser = async (user_id) => {
    try {
        // Implement sign-out logic
        return { message: 'User signed out successfully' };
    } catch (error) {
        throw new CustomError(error.message || 'Error signing out user', error.statusCode || 500);
    }
};

export {
    SignUpNewUser,
    SignInUser,
    VerifyUser,
    ResetUserPassword,
    SignUpUserUsingGoogle,
    SignInUserUsingGoogle,
    SignOutUser,
    UpdateUserDetails,
    UserDetails,
    getAuthors
};
