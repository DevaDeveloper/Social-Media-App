import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Navbar from '../../components/navbar/Navbar';
import Post from '../../components/post/Post';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllPosts } from './homeScreenSlice';
import styles from './HomeScreen.module.scss';
// import useAuth from '../../routes/useAuth';

const HomeScreen: FC = () => {
  // useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const userPosts = useAppSelector((state) => state.userPosts.postsList);
  const status = useAppSelector((state) => state.userPosts.status);
  const { token, currentUser } = useAppSelector((state) => state.login);
  const { userType } = currentUser;
  // useAuth();
  useEffect(() => {
    const fetchAll = async () => {
      await dispatch(fetchAllPosts(token));
    };

    if (userType === 'ADMIN') {
      history.push('/admin');
    } else if (!token) {
      history.push('/login');
    } else {
      fetchAll();
    }
  }, []);

  return (
    <div className={styles.homeScreenHolder}>
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
