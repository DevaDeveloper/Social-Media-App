import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

const getPostId = async (token: string, postId: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/post/${postId}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.response);
    return error.response;
  }
};
export { getPostId };
export default {};
