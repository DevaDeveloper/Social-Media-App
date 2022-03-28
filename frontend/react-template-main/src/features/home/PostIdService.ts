import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

const getPostId = async (token: string, postId: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/post/${postId}`);
  const url = BaseService.combine(path, queryString);

  const response: AxiosResponse = await baseService.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
export { getPostId };
export default {};
