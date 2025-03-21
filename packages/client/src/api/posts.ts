import { toast } from 'react-toastify';
import { apiUrl } from '../config';
import { IPost, IPostCreate } from '../../../../shared/models';

const fetchPosts = async (): Promise<IPost[]> => {
  try {
    const response = await fetch(`${apiUrl}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || 'Failed to fetch posts');
    throw error;
  }
};

const createPost = async (
  newPost: IPostCreate | Partial<IPost>,
): Promise<IPost> => {
  try {
    const response = await fetch(`${apiUrl}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      alert(444);
      throw new Error('Failed to add post 1');
    }
    const addedPost = await response.json();
    toast.success('Post added successfully');
    return addedPost;
  } catch (error: any) {
    toast.error(error.message || 'Failed to add post 1');
    throw error;
  }
};

const removePost = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}/posts/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete post');
    toast.success('Post deleted successfully');
  } catch (error: any) {
    toast.error(error.message || 'Failed to delete post');
    throw error;
  }
};

const modifyPost = async (updatePost: Partial<IPost>): Promise<IPost> => {
  try {
    const response = await fetch(`${apiUrl}/posts/${updatePost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePost),
    });
    if (!response.ok) throw new Error('Failed to update post');
    const updatedPost = await response.json();
    toast.success('Post updated successfully');
    return updatedPost;
  } catch (error: any) {
    toast.error(error.message || 'Failed to update post');
    throw error;
  }
};

const fetchPostById = async (id: number) => {
  // const response = await fetch(`${apiUrl}/posts/${id}`);
  // if (response.ok) {
  //   const postData = await response.json();
  //   return postData;
  // }
  // throw new Error('Failed to fetch post');

  try {
    const response = await fetch(`${apiUrl}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || 'Failed to fetch post');
    throw error;
  }
};

export { fetchPosts, createPost, removePost, modifyPost, fetchPostById };
