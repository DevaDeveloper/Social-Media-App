import { FC } from 'react';
import {
  COUNTER_PATH,
  HOME_PATH,
  POSTS_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  USER_POSTS,
  NEW_POST,
  USER_PROFILE,
  POST_ID,
  ADMIN,
} from './path-constants';
import CounterScreen from '../features/counter/CounterScreen';
import PostPage from '../pages/PostsPage/PostPage';
import HomePage from '../pages/HomePage/HomePage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import LoginPage from '../pages/LoginPage/Login';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import AllUserPostsPage from '../pages/AllUserPostsPage/AllUserPostsPage';
import NewPostPage from '../pages/NewPostPage/NewPostPage';
import UserProfilePage from '../pages/UserProfilePage/UserProfilePage';
import PostPageId from '../pages/PostPageId/PostPageId';
import AdminScreen from '../pages/AdminPage/AdminPage';

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
pathComponentArray.push({ path: NEW_POST, component: NewPostPage });
pathComponentArray.push({ path: USER_PROFILE, component: UserProfilePage });
pathComponentArray.push({ path: POST_ID, component: PostPageId });
pathComponentArray.push({ path: ADMIN, component: AdminScreen });
pathComponentArray.push({
  path: '/user-profile/:userId',
  component: UserProfilePage,
});

pathComponentArray.push({ component: NotFoundPage });

export { pathComponentArray };
export default {};
