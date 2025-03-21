import React from 'react';
import { usePosts } from '../context/PostContext';

const PostList: React.FC = () => {
  const { posts, deletePost } = usePosts();

  return (
    <div className="p-4">
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border">
          <h2 className="text-lg">{post.title}</h2>
          <p>{post.content}</p>
          <button
            onClick={() => deletePost(post.id)}
            className="bg-red-500 text-white p-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
