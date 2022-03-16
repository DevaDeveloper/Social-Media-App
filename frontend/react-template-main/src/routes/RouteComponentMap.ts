import { FC } from 'react';
import {
  COUNTER_PATH,
  HOME_PATH,
  POSTS_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  USER_POSTS,
} from './path-constants';
import CounterScreen from '../features/counter/CounterScreen';
import PostPage from '../pages/PostsPage/PostPage';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../pages/LoginPage/Login';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AllUserPostsPage from '../pages/AllUserPostsPage/AllUserPostsPage';

interface IPathComponent {
  path?: string;
  component: FC;
}

const pathComponentArray: IPathComponent[] = [];

pathComponentArray.push({ path: COUNTER_PATH, component: CounterScreen });
pathComponentArray.push({ path: POSTS_PATH, component: PostPage });
pathComponentArray.push({ path: HOME_PATH, component: HomePage });
pathComponentArray.push({ path: LOGIN_PATH, component: LoginPage });
pathComponentArray.push({ path: REGISTER_PATH, component: RegisterPage });
pathComponentArray.push({ path: USER_POSTS, component: AllUserPostsPage });

pathComponentArray.push({ component: NotFoundPage });

export { pathComponentArray };
export default {};
