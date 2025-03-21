import { IPost, IPostCreate } from '../../../../shared/models';
import Post from '../models/Post';

// Get all posts
export const getAllPosts = async (): Promise<IPost[]> => {
  return await Post.findAll({
    order: [['createdAt', 'DESC']],
  });
};

// Get a post by its ID
export const getPostById = async (id: string): Promise<IPost | null> => {
  return await Post.findByPk(id);
};

// Create a new post
export const createNewPost = async (postData: IPostCreate): Promise<IPost> => {
  return await Post.create(postData);
};

// Update an existing post
export const updateExistingPost = async (
  id: string,
  postData: IPostCreate,
): Promise<IPost | null> => {
  const post = await Post.findByPk(id);
  if (!post) return null;

  post.title = postData.title;
  post.content = postData.content;
  await post.save();
  return post;
};

// Delete a post
export const deletePostById = async (id: string): Promise<void> => {
  const post = await Post.findByPk(id);
  if (post) {
    await post.destroy();
  }
};
