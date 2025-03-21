import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
// import { fetchPosts, addPost, deletePost, updatePost } from '../services/apiService';
import { IPost, IPostCreate } from '../../../../shared/models';
import { createPost, removePost, fetchPosts, modifyPost } from '../api/posts';

interface PostContextType {
  posts: IPost[];
  loadPosts: () => void;
  addPost: (post: IPostCreate | Partial<IPost>) => void;
  deletePost: (id: number) => void;
  updatePost: (post: Partial<IPost>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const loadPosts = async () => {
    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const addPost = async (newPost: IPostCreate | Partial<IPost>) => {
    try {
      const addedPost = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, addedPost]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const deletePost = async (id: number) => {
    try {
      await removePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const updatePost = async (updatedPost: Partial<IPost>) => {
    try {
      const updated = await modifyPost(updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updated.id ? updated : post)),
      );
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        loadPosts,
        addPost,
        deletePost,
        updatePost,
      }}
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
