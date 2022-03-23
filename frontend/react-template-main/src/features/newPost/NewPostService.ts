import { AxiosResponse } from 'axios';

import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

const createPost = async (data = {}, token, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/post');
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.post(url, data, {
      //   withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(token);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
};
export { createPost };
export default {};
