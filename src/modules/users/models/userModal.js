// userModel.js

import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    user_id: { type: String, required: true, unique: true, default: uuidv4() },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: {
        country: { type: String, required: true, default: "WANO" },
        state: { type: String, required: true, default: "ONIGASHIMA" },
        city: { type: String, required: true, default: "FLOWER CAPITAL" },
        street: { type: String, required: true, default: "NEW_STREET" },
        pincode: { type: String, required: true, default: "123-123" },
        landmark: { type: String, required: true, default: "WATER-7" }
    },
    age: { type: Number, required: true, default: '34' },
    dob: { type: Date, required: true, default: '1990-01-01' },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
    bio: { type: String, required: true, default: "Hi Everyone" },
    occupation: { type: String, required: true, default: "student" },
    phone: { type: String, required: true, default: "1234-1234-1234" },
    googleId: { type: String, default: "google_id" },  // for Google sign-in integration
    verified: { type: Boolean, default: false },
    userImage: { type: String, default: "" },
    roles: { type: [String], default: ['user'] },
    deleted: { type: Boolean, default: false }
}, { timestamps: true });

const User = model('users', userSchema);

export default User;
