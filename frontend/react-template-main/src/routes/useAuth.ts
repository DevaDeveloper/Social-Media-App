import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { restartToken, logoutUser } from '../features/login/loginSlice';
import { LOGIN_PATH } from './path-constants';

const useAuth = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.login.token);
  const refreshToken = localStorage.getItem('jwtToken');

  const handleTokenUsage = () => {
    if (!token) {
      dispatch(restartToken(refreshToken));
    }
    if (!refreshToken) {
      dispatch(logoutUser());
      history.push(LOGIN_PATH);
    }
  };

  return handleTokenUsage();
};
export default useAuth;
