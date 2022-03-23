import React, { FC } from 'react';
import { Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import TodayIcon from '@mui/icons-material/Today';
import Navbar from '../home/Navbar';
import CoverImg from '../../assets/ProfileCover.png';
import ProfileImg from '../../assets/avatar1.png';
import styles from './userProfile.module.scss';
// import Post from '../../components/post/Post';

const UserProfileScreen: FC = () => (
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
  </div>
);

export default UserProfileScreen;
