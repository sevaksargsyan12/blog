import { Request, Response } from 'express';
import * as postService from '../../services/postService'; // Importing service methods
import { IPostCreate } from '../../../../../shared/models';

// Get all posts
const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving posts' });
  }
};

// Get a post by its ID
const getPostById = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
): Promise<void> => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    } else {
      res.json(post);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving post' });
  }
};

// Create a new post
const createPost = async (
  req: Request<{}, {}, IPostCreate>,
  res: Response,
): Promise<void> => {
  try {
    const newPost = await postService.createNewPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error while creating post' });
  }
};

// Update an existing post
const updatePost = async (
  req: Request<{ id: string }, {}, IPostCreate>,
  res: Response,
): Promise<void> => {
  try {
    const updatedPost = await postService.updateExistingPost(
      req.params.id,
      req.body,
    );
    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed post updating...' });
  }
};

// Delete a post
const deletePost = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
): Promise<void> => {
  try {
    await postService.deletePostById(req.params.id);
    res.status(204).send(); // No content, post deleted
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete posts...' });
  }
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
