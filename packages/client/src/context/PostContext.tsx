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
import LoadingOverlay from '../ui/Loading';

interface PostContextType {
  posts: IPost[];
  editingPost: IPost | null;
  setEditingPost: (post: IPost | null) => void;
  loadPosts: () => void;
  addPost: (post: IPostCreate | Partial<IPost>) => void;
  deletePost: (id: number) => void;
  updatePost: (post: Partial<IPost>) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const loadPosts = async () => {
    setLoading(true);

    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (newPost: IPostCreate | Partial<IPost>) => {
    setLoading(true);

    try {
      const addedPost = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, addedPost]);
    } catch (error) {
      console.error('Error adding post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    setLoading(true);

    try {
      await removePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (updatedPost: Partial<IPost>) => {
    setLoading(true);

    try {
      const updated = await modifyPost(updatedPost);
      console.log({ updated });
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === updated.id ? updated : post)),
      );
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
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
        editingPost,
        setEditingPost,
        addPost,
        deletePost,
        updatePost,
      }}
    >
      {isLoading && <LoadingOverlay />}
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
