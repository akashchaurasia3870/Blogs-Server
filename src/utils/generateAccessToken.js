import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const generatingAccessToken = async function (user_id, email) {
    return jwt.sign(
        {
            user_id,
            email
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '20min' }
    )
}

export { generatingAccessToken }