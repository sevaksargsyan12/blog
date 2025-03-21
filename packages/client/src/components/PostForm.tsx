import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePosts } from '../context/PostContext';
import { IPost, IPostCreate } from '../../../../shared/models';

const PostForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IPostCreate | Partial<IPost>>();
  const { addPost, updatePost, editingPost, setEditingPost } = usePosts();

  useEffect(() => {
    if (editingPost) {
      (Object.keys(editingPost) as Array<keyof IPost>).forEach((field) => {
        setValue(field, editingPost[field]);
      });
    }
  }, [editingPost, setValue]);

  const onSubmit = (data: IPostCreate | Partial<IPost>) => {
    if (editingPost) {
      updatePost({ ...data, id: editingPost.id });
    } else {
      addPost(data as IPostCreate);
    }
    reset();
    setEditingPost(null);
  };

  return (
    <div className="bordered border-2 border-b-blue-950 rounded-3xl p-4 m-4">
      <h1 className="text-4xl text-center">
        {' '}
        {editingPost ? 'Edit Post' : 'Create Post'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-2 bg-primary">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="border p-1 w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="content" className="block mb-2">
            Content:
          </label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            className="border p-1 w-full"
          />
          {errors.content && (
            <p className="text-red-500 text-xs italic">
              {errors.content.message}
            </p>
          )}
        </div>
        <div className="mb-2">
          <label htmlFor="status" className="block mb-2">
            Status:
          </label>
          <select {...register('status')} className="border p-1 w-full">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingPost ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
