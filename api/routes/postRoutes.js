import express from 'express';
import {
    createPost,
    getPost,
    updatePost,
    likePost,
    deletePost,
    timelinePost
} from '../controllers/postController.js';

const postRoutes = express.Router()

postRoutes.post('/', createPost)
postRoutes.get('/', getPost)
postRoutes.put('/:id', updatePost)
postRoutes.put('/:id/like', likePost)

postRoutes.delete('/:id', deletePost)
postRoutes.get('/timeline/:userId', timelinePost)

export default postRoutes