import { AxiosResponse } from 'axios';

import BaseService from '../../services/common/BaseService';
import { TokenModel } from './modelLogin';

const baseService = new BaseService();

const loginUser = async (data = {}, query = {}) => {
  const queryString = baseService.qs.stringify(query);
  // @ts-ignore
  const path = baseService.url.build('/auth/signin');
  const url = BaseService.combine(path, queryString);

  const response: AxiosResponse<TokenModel> = await baseService.post(
    url,
    data,
    {},
  );

  return response.data;
};
export { loginUser };
export default {};
