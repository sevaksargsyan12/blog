import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { apiUrl } from '../config';
import { IPost, IPostCreate } from '../../../../shared/models';

interface PostContextType {
  posts: IPost[];
  fetchPosts: () => void;
  addPost: (post: IPostCreate | Partial<IPost>) => void;
  deletePost: (id: number) => void;
  updatePost: (post: Partial<IPost>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (newPost: IPostCreate | Partial<IPost>) => {
    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        fetchPosts(); // Refresh the posts after adding
      }
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPosts(); // Refresh the posts after deleting
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const updatePost = async (updatedPost: Partial<IPost>) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${updatedPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      if (response.ok) {
        fetchPosts(); // Refresh the posts after updating
      }
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, fetchPosts, addPost, deletePost, updatePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};
