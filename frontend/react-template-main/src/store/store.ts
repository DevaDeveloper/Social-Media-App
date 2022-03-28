import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import counterReducer from '../features/counter/counterSlice';
import todoReducer from '../features/todos/todoSlice';
import loginReducer from '../features/login/loginSlice';
import registerReducer from '../features/register/registerSlice';
import userPostsReducer from '../features/home/homeScreenSlice';
import newPostReducer from '../features/newPost/newPostSlice';
import adminReducer from '../features/admin/AdminSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    todos: todoReducer,
    login: loginReducer,
    register: registerReducer,
    userPosts: userPostsReducer,
    newPost: newPostReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
