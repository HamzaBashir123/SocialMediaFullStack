import Post from '../models/post.js'
import User from '../models/user.js'
// import bcrypt from 'bcryptjs'

// Creating Post
export const createPost = async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).send({
            status: "Success",
            message: "Post has been created",
            data: savedPost,
        });
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// Getting Post
export const getPost = async (req, res) => {
    console.log(req.query, "==>req query")
    const queryObj = { ...req.query }
    console.log(queryObj, "===>>before sideLine")


    const sideLine = ["desc"]

    sideLine.forEach(el => delete queryObj[el])
    

    console.log(queryObj, "===>>after sideLine")
    try {
        const post = await Post.find(''||queryObj);
        res.status(200).send({
            status: "Success",
            message: "Show user post",
            data: post,
        });
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// Update Post
export const updatePost = async (req, res) => {
    // console.log(req.params);
    try {
        const post = await Post.findById(req.params.id);
        // console.log(post._doc);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).send({
                status: "Success",
                message: "Post has been updated",
            });
        } else {
            return res.status(403).send({
                status: "Failed",
                message: "You can update only your post",
            });
        }
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// Delete Post
export const deletePost = async (req, res) => {
    // console.log(req.params);
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).send({
                status: "Success",
                message: "Post has been deleted",
            })
        } else {
            return res.status(403).send({
                status: "Failed",
                message: "You can delete only your post",
            });
        }
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// Like/unlike Post
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).send({
                status: "Success",
                message: "Post has been liked",
            });
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).send({
                status: "Success",
                message: "Post has been disliked",
            });
        }
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// Timeline all Post
export const timelinePost = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userposts = await Post.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).send({
            status: "Success",
            message: "Post has been created",
            data: userposts.concat(...friendPosts),
        })
    } catch (error) {
        console.log(error, "<<==Error");
        res.status(500).send({
            status: "Failed",
            message : error.message,
        });
    }
}

// export const timelinePost = async (req, res) => {
    

//         try {
//             const currentUser = await User.findById(req.params.userId)
//             const userPosts = await Post.find({ userId: currentUser._id })
//             const friendPost = await Promise.all(
//                 currentUser.followings.map((friendId) => {
//                     return Post.find({ userId: friendId })
//                 })
//             )
    
//             res.status(200).json(userPosts.concat(...friendPost))
    
//         } catch (error) {
//             res.status(500).jso
//         }
    
// }
