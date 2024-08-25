import CustomError from '../../../customErrors/CustomError.js'
import { Comment, Location, Blog, Likes } from '../models/blogModel.js';

async function addPost(data) {
    try {

        console.log(data);


        let { user_id, images, videos, caption, hashtags, content } = data;
        let newPost = new Blog({
            user_id,
            filePaths: { "images": images, "videos": videos },
            caption,
            content,
            hashtags: hashtags.split(',')
        })

        console.log(newPost);

        await newPost.save();

        return { message: 'New Blog Added Successfully', success: true, statusCode: 201 };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getPostById(data) {
    try {
        // Find Blog By User ID 
        let { user_id } = data;
        console.log(user_id);

        const filter = { user_id };
        const blogs = await Blog.find(filter, { projection: { comments: 0, deleted: 0, _id: 0 } });
        return { message: 'User Posts', success: true, statusCode: 200, data: blogs }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function getPost(req) {
    try {
        let { search ,option } = req.body;
        

        // const filter = { user_id };
        // const blogs = await Blog.find({}, { projection: { comments: 0, deleted: 0, _id: 0 } });

        option = 'date_created'; // or 'likes', based on the sorting option

        const sortOptions = {
            date_created: -1, // Default descending order
            likes: -1         // Default descending order
        };

        // Build the $sort stage based on the option
        const sortStage = {
            [option]: sortOptions[option] || -1 // Fallback to descending order if option is not valid
        };

        const blogs = await Blog.aggregate([
            {
                $match: {
                    $or: [
                        { caption: { $regex: search, $options: 'i' } },
                        // { content: { $regex: search, $options: 'i' } },
                        { hashtag: { $regex: search, $options: 'i' } }
                    ]
                }
            },
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            },
            {
                $sort: sortStage
            }
        ]);

        const category_blog = await getSimilerBlogs();
        const trending_blog = await getTrandingBlogs();
        const trending_author = await getTradingAuthor();

        console.log("category_blog ",category_blog);
        console.log("trending_blog ",trending_blog);
        console.log("trending_author ",trending_author);
        

        return { message: 'User Posts', success: true, statusCode: 200, data: blogs , data_c : {category_blog,trending_blog,trending_author} }

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function getSimilerBlogs(category='') {
    try {

        const blogs = await Blog.aggregate([
            // {
            //     $match: {
            //         category: { $regex: category, $options: 'i' }
            //     }
            // },
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            },
            {
                $sort: { date_created: -1 }
            },
            {
                $limit: 7
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching similar blogs', error.statusCode || 500);
    }
}

async function getTrandingBlogs() {
    try {
        const blogs = await Blog.aggregate([
            {
                $project: {
                    comments: 0,
                    deleted: 0,
                    _id: 0
                }
            },
            {
                $sort: { likes: -1 }
            },
            {
                $limit: 7
            }
        ]);

        return blogs ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching trending blogs', error.statusCode || 500);
    }
}

async function getTradingAuthor() {
    try {
        const authors = await Blog.aggregate([
            {
                $sort: { likes: -1 }
            },
            {
                $limit: 7
            }
        ]);

        return  authors ;
    } catch (error) {
        throw new CustomError(error.message || 'Error fetching trending authors', error.statusCode || 500);
    }
}


async function updatePost(data) {
    try {
        let { user_id, blog_id, caption } = data;
        const filter = { user_id, blog_id };
        const update = { $set: { caption } };
        const blogs = await Blog.updateOne(filter, update);
        return { message: 'Blog Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function deletePost(data) {
    try {

        let { user_id, blog_id } = data;
        const filter = { user_id, blog_id };
        const update = { $set: { deleted: true } };
        const blogs = await Blog.updateOne(filter, update);
        return { message: 'Blog Updated Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}
async function deleteLike(data) {
    try {

        let { user_id, blog_id } = data;
        let filter = { user_id, blog_id };
        const update = { $set: { deleted: true } };
        const like = await Likes.updateOne(filter, update);


        filter = { blog_id };
        // const update = { $set: { comment: comment.push(newComments.comment_id) } };
        const blog = await Blog.findOne(filter);

        if (!blog) {
            return { message: 'Blog Not Found' };
        }

        blog.likes--;
        const updatedPost = await blog.save();

        return { message: 'Delete Like Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function addLikes(data) {
    try {

        let { user_id, blog_id } = data;
        const newlike = new Likes({
            user_id, blog_id
        });

        await newlike.save();

        const filter = { blog_id };
        // const update = { $set: { comment: comment.push(newComments.comment_id) } };
        const blog = await Blog.findOne(filter);

        if (!blog) {
            return { message: 'Blog Not Found' };
        }

        blog.likes++;
        const updatedPost = await blog.save();

        return { message: 'Update Like Successfully' };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}

async function addComment(data) {
    try {

        let { user_id, blog_id, comment } = data;

        const newComments = new Comment({
            user_id, blog_id, comment
        });

        await newComments.save();

        let comment_id = newComments.comment_id;

        const filter = { blog_id };
        // const update = { $set: { comment: comment.push(newComments.comment_id) } };
        const blog = await Blog.findOne(filter);

        if (!blog) {
            return { message: 'Blog Not Found' };
        }

        blog.comments.push(comment_id);

        const updatedPost = await blog.save();

        return { message: 'Comment Added Successfully', blog: updatedPost };

    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
}




export { addPost, getPost, deletePost, updatePost, addComment, addLikes, deleteLike };