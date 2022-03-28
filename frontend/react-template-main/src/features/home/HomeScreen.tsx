import React, { FC, useEffect } from 'react';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Navbar from './Navbar';
import Post from '../../components/post/Post';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllPosts } from './homeScreenSlice';

const HomeScreen: FC = () => {
  const userPosts = useAppSelector((state) => state.userPosts.postsList);
  const status = useAppSelector((state) => state.userPosts.status);
  const token = useAppSelector((state) => state.login.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchAllPosts(token));
    };

    fetchAll();
  }, []);

  return (
    <div>
      <Navbar />
      {status === 'pending' && (
        <h1
          style={{
            color: '#00B960',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          LOADING DATA...
          <HourglassEmptyIcon sx={{ fontSize: '2.8rem' }} />
        </h1>
      )}

      {status === 'rejected' && (
        <h1
          style={{
            color: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ERROR: COULD NOT LOAD DATA...
          <HourglassEmptyIcon sx={{ fontSize: '2.5rem', color: 'red' }} />
        </h1>
      )}
      <ul>
        {userPosts.map((post) => (
          <Post
            id={post.id}
            idUser={post.idUser}
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
