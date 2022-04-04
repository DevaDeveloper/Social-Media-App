/* eslint-disable no-console */
import React, { FC, useEffect } from 'react';
import { Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import TodayIcon from '@mui/icons-material/Today';
import Navbar from '../../components/navbar/Navbar';
import CoverImg from '../../assets/ProfileCover.png';
import ProfileImg from '../../assets/avatar1.png';
import styles from './userProfile.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAllPosts } from '../home/homeScreenSlice';
import Post from '../../components/post/Post';

const UserProfileScreen: FC = () => {
  const token = useAppSelector((state) => state.login.token);
  const { idUserProfile, postsList } = useAppSelector(
    (state) => state.userPosts,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        await dispatch(fetchAllPosts(token));
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <main className={styles.container}>
        {/*  HEADER */}
        <div className={styles.userProfileHeader}>
          <img src={CoverImg} alt="cover" />
          <img src={ProfileImg} alt="profileImg" />
          <div className={styles.usernamesOutter}>
            <div className={styles.usernameInner}>
              <Typography variant="h4">John Brown</Typography>
              <p>@john.brown</p>
            </div>
          </div>
        </div>

        {/* USER INFO */}
        <div className={styles.userInfo}>
          <article className={styles.infos}>
            <Typography variant="h5" sx={{ margin: '10px 0' }}>
              User Information
            </Typography>
            <div>
              <EmailIcon />
              <p>john.brown@gmail.com</p>
            </div>
            <div>
              <BadgeIcon />
              <p>User</p>
            </div>
            <div>
              <TodayIcon />
              <p>12/06/1990</p>
            </div>
          </article>

          <article className={styles.userActions}>
            <div>
              <span>21</span>
              <p>Publications</p>
            </div>
            <div>
              <span>321</span>
              <p>Reactions</p>
            </div>
            <div>
              <span>115</span>
              <p>Comments</p>
            </div>
          </article>
        </div>

        {/* <Post /> */}
      </main>

      <div className="posts">
        {postsList
          .filter((post) => post.idUser === idUserProfile)
          .map((post) => (
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
      </div>
    </div>
  );
};
export default UserProfileScreen;
