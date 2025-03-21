import { IPost, IPostCreate } from '../../../../shared/models';
import Post from '../models/Post';

// Get all posts
export const getAllPosts = async (): Promise<IPost[]> => {
  return await Post.findAll();
};

// Get a post by its ID
export const getPostById = async (id: string): Promise<Post | null> => {
  return await Post.findByPk(id); // Sequelize model instance
};

// Create a new post
export const createNewPost = async (postData: IPostCreate): Promise<Post> => {
  return await Post.create(postData); // Returns a Sequelize model instance
};

// Update an existing post
export const updateExistingPost = async (
  id: string,
  postData: IPostCreate,
): Promise<Post | null> => {
  const post = await Post.findByPk(id); // Find the post by ID
  if (!post) {
    return null;
  }

  post.title = postData.title;
  post.content = postData.content;
  await post.save(); // Save the updated post
  return post;
};

// Delete a post
export const deletePostById = async (id: string): Promise<void> => {
  const post = await Post.findByPk(id);
  if (post) {
    await post.destroy(); // Delete the post from the database
  }
};
