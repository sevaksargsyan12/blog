import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePosts } from '../context/PostContext';
import { IPost, IPostCreate } from '../../../../shared/models';
import { fetchPostById } from '../api/posts';

interface PostFormProps {
  id?: number; // Optional id for editing a post
}

const PostForm: React.FC<PostFormProps> = ({ id }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IPostCreate | Partial<IPost>>();
  const { addPost, updatePost } = usePosts();

  useEffect(() => {
    if (id) {
      const fetchPostData = async () => {
        const postData = await fetchPostById(id);
        if (postData) {
          Object.keys(postData).forEach((field) => {
            setValue(field as keyof IPost, postData[field]);
          });
        }
      };
      fetchPostData();
    }
  }, [id, setValue]);

  const onSubmit = (data: IPostCreate | Partial<IPost>) => {
    if (id) {
      updatePost({ ...data, id });
    } else {
      addPost(data as IPostCreate);
    }
    reset();
  };

  return (
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
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
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
        className="bg-blue-500 text-white p-2 cursor-pointer"
      >
        {id ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default PostForm;
