import React, { FC, useEffect } from 'react';
import Navbar from './Navbar';
import Post from '../../components/post/Post';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchAllPosts,
  getLikeWithId,
  fetchLikeWithId,
} from './homeScreenSlice';

const HomeScreen: FC = () => {
  const userPosts = useAppSelector((state) => state.userPosts.postsList);
  const token = useAppSelector((state) => state.login.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAll = async () => {
      const response = await dispatch(fetchAllPosts(token));
      console.log(response);
    };
    //  get /like /post /id testing
    const fetchLike = async () => {
      const response = await dispatch(
        getLikeWithId({
          postId: '27011a78-fe98-427b-a892-20098d2e22a4',
          token,
        }),
      );
      console.log(response);
    };
    //  get / like/id testing
    const fetchLikeIdId = async () => {
      const response = await dispatch(
        fetchLikeWithId({
          postId: 'c2987f78-849f-485b-b034-6801c8efc5e5',
          token,
        }),
      );
      console.log(response);
    };

    fetchAll();
    fetchLike();
    fetchLikeIdId();

    console.log(token);
  }, []);

  return (
    <div>
      <Navbar />

      <ul>
        {userPosts.map((post) => (
          <Post
            id={post.id}
            key={post.id}
            username={post.username}
            date={post.createdAt}
            location={post.location}
            accessibilityTag={post.accessibility}
            typeTag={post.type}
            description={post.description}
            upvotes={post.likescount}
            downvotes={post.downvotes}
            comments={post.comments}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
