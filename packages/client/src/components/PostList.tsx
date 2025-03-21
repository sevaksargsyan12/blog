import React, { useState } from 'react';
import { usePosts } from '../context/PostContext';
import { StatusType } from '../../../../shared/types';
import Modal from '../ui/Modal';

const PostList: React.FC = () => {
  const { posts, deletePost, setEditingPost } = usePosts();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'private':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  const openModal = (post: any) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`mb-4 p-4 border rounded shadow ${getStatusColor(post.status)}`}
        >
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p className="my-2">{post.content}</p>
          <div className="flex justify-between">
            <button
              onClick={() => setEditingPost(post)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => deletePost(post.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => openModal(post)}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            >
              View
            </button>
          </div>
        </div>
      ))}
      {isModalOpen && selectedPost && (
        <Modal post={selectedPost} closeModal={closeModal} />
      )}
    </div>
  );
};

export default PostList;
