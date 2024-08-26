import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema, model } = mongoose;

const ThemeSchema = new Schema({
    
   theme_user_id: {
        type: String,
        required: true
   },

   theme: {
        type: String,
        enum: ['black', 'white'], // Add more themes as needed
        default: 'white',
        required: true
    },
    fontSize: {
        type: String,
        default: '10px',
        required: true
    },
    fontColor: {
        type: String,
        default: '#000000', // Default to black
        required: true
    },
    fontWeight: {
        type: String,
        enum: ['font-light', 'font-normal', 'font-semibold', 'font-bold'], // Example values, add more if needed
        default: 'font-normal',
        required: true
    },
    fontStyle: {
        type: String,
        enum: ['font-normal', 'font-italic'], // Add more if needed
        default: 'font-normal',
        required: true
    },
    backgroundStyle: {
        type: String,
        default: '', // Could be a color, URL, or pattern
    }
}, { timestamps: true });

const Theme = model('Theme', ThemeSchema);

export default Theme;
