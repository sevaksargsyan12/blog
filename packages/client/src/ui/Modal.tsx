// Modal.tsx
import React from 'react';
import formatDate from '../utils/date';
import { IPost } from '../../../../shared/models';

interface ModalProps {
  post: IPost;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ post, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded mx-auto w-5/6 sm:w-full sm:max-w-xl">
        <h3 className="text-xl font-bold">{post.title}</h3>
        <h6 className="italic font-bold text-gray-400 text-[16px]">
          <span className="text-black">Status:</span> {post.status}
        </h6>
        <h6 className="italic font-bold text-gray-400 text-[16px]">
          <span className="text-black">Creation date:</span>{' '}
          {post.createdAt && formatDate(post.createdAt.toString())}
        </h6>
        <p>{post.content}</p>
        <button
          onClick={closeModal}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
