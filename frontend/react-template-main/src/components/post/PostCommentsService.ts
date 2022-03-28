import { AxiosResponse } from 'axios';

import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

// post /comment
const postComment = async (data = {}, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/comment');
  const url = BaseService.combine(path, queryString);

  const response: AxiosResponse = await baseService.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// get /comment
const getComment = async (token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/comment');
  const url = BaseService.combine(path, queryString);

  const response: AxiosResponse = await baseService.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// get /comment/ id
const getCommentId = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/comment/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

// patch /comment/id
const patchComment = async (
  data: {},
  postId: string,
  token: string,
  query = {},
) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/comment/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.patch(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

// delete /comment/id
const deleteComment = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/comment/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { postComment, getComment, getCommentId, patchComment, deleteComment };
export default {};
