import React from 'react';
import Login from '../LoginPage/Login';
// import { Link } from 'react-router-dom';
import Page from '../Page';
// import { COUNTER_PATH, POSTS_PATH } from '../../routes/path-constants';

const HomePage = () => (
  <Page>
    <Login />
    {/* <p>
      This is home page, go to
      <br />
      <Link to={COUNTER_PATH}> Counter</Link>
      <br />
      <Link to={POSTS_PATH}> Posts</Link>
    </p> */}
  </Page>
);

export default HomePage;
