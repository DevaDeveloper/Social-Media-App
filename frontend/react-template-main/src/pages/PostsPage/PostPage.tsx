import React, { FC } from 'react';
import PostsScreen from '../../features/posts/PostsScreen';
import Page from '../Page';

interface PageTestProps {
  test?: string;
}

const PostPage: FC<PageTestProps> = () => (
  <Page>
    <PostsScreen />
  </Page>
);

export default PostPage;
