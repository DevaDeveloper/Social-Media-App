import { AxiosResponse } from 'axios';
import BaseService from '../../services/common/BaseService';
import { RegisterModel } from './modelRegister';

// Testing service - needs some kind of remake
const baseService = new BaseService();

//  ovo izvuci iz env file
const BASE_URL = 'http://localhost:5000';

const signupUser = async (data = {}, query = {}): Promise<RegisterModel> => {
  const queryString = baseService.qs.stringify(query);
  //   const path = baseService.url.build('auth');
  // eslint-disable-next-line prefer-template
  const path = BASE_URL + '/auth/signup';

  const url = BaseService.combine(path, queryString);
  const response: AxiosResponse<RegisterModel> = await baseService.post(
    url,
    data,
    {},
  );
  return response.data;
};
export { signupUser };
export default {};
