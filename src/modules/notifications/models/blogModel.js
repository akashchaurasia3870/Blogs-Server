import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const commentSchema = new mongoose.Schema({
    comment_id: {
        type: String,
        default: uuidv4()
    },
    user_id: {
        type: String,
        required: true
    },
    blog_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const likesSchema = new mongoose.Schema({
    like_id: {
        type: String,
        default: uuidv4()
    },
    user_id: {
        type: String,
        required: true
    },
    blog_id: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const blogSchema = new mongoose.Schema({
    blog_id: {
        type: String,
        default: uuidv4()
    },
    user_id: {
        type: String,
        required: true
    },
    filePaths: {
        images: {
            type: [String],
            required: true
        },
        videos: {
            type: [String],
            required: true
        }
    },
    caption: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    hashtags: {
        type: [String],
        default: []
    },
    location: {
        type: locationSchema,
        required: false
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false

    }
});

const Blog = mongoose.model('blogs', blogSchema);
const Comment = mongoose.model('comment', commentSchema);
const Likes = mongoose.model('likes', likesSchema);
const Location = mongoose.model('location', locationSchema);

export { Blog, Comment, Location, Likes };
