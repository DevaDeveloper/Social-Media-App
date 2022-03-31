import { AxiosResponse } from 'axios';

import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

// delete / post/id
const deletePost = async (postId: string, token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/post/${postId}`);
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

export { deletePost };
export default {};
