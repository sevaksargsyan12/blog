import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController';

const router = express.Router();

// Define routes with proper types
router.get('/posts', getPosts); // Get all posts
router.get('/posts/:id', getPostById); // Get post by ID
router.post('/posts', createPost); // Create new post
router.put('/posts/:id', updatePost); // Update existing post
router.delete('/posts/:id', deletePost); // Delete post by ID

export default router;
