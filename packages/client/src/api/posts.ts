import { apiUrl } from '../config';

export const fetchPostById = async (id: number) => {
  const response = await fetch(`${apiUrl}/posts/${id}`);
  if (response.ok) {
    const postData = await response.json();
    return postData;
  }
  throw new Error('Failed to fetch post');
};
