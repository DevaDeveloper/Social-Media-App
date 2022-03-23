import { AxiosResponse } from 'axios';

import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

const PostLike = async (data = {}, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/like');
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

const getLikeId = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/like/post/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(token);
    console.log(error);
    return error.response;
  }
};

// like/id
const fetchLikeId = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/like/${postId}`);
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

// delete / like/id
const deleteLike = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/like/${postId}`);
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

// put like/id
const putLike = async (data: {}, postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/like/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.put(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { PostLike, getLikeId, fetchLikeId, deleteLike, putLike };
export default {};
