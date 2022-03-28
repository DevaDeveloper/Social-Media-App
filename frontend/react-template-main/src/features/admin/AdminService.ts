import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';

const baseService = new BaseService();

const getUsers = async (token: string, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/user');
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

const blockUser = async (data: {}, token: string, idUser: any, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build(`/user/block/${idUser}`);
  const url = BaseService.combine(path, queryString);
  try {
    const response: AxiosResponse = await baseService.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};

export { getUsers, blockUser };
export default {};
