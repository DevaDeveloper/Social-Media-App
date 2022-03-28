/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from 'react-bootstrap/Card';
import { unwrapResult } from '@reduxjs/toolkit';
import ForestPost from '../../assets/forestpost.png';
import Avatar from '../../assets/avatar1.png';
import styles from './Post.module.scss';
import {
  fetchOnePost,
  // getPostLikes,
  postLike,
  setUserId,
} from '../../features/home/homeScreenSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface CardProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
  idUser: string;
  username: string;
  accessibilityTag: string;
  typeTag: string;
  date: string;
  description: string;
  location: string;
  upvotes: string;
  downvotes: number;
  comments: number;
}

const Post: FC<CardProps> = ({
  id,
  idUser,
  username,
  accessibilityTag,
  typeTag,
  date,
  description,
  upvotes,
  location,
  downvotes,
  comments,
}) => {
  const [postId, setPostId] = useState<string>(id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId] = useState<string>(idUser);

  const dispatch = useAppDispatch();
  const history = useHistory();
  const token = useAppSelector((state) => state.login.token);
  const errMessage = useAppSelector((state) => state.userPosts.errMessage);

  useEffect(() => {}, [upvotes]);

  const handlePostId = () => {
    setPostId(id);
    dispatch(fetchOnePost({ token, postId }))
      .then(unwrapResult)
      .then(() => history.push('/user-posts-postid'))
      .catch(() => console.error(errMessage));
  };

  // post like
  const handlePostLike = async () => {
    await dispatch(postLike({ obj: { type: 'UPVOTE', idPost: id }, token }));
  };
  // post dislike
  const handlePostDislike = async () => {
    await dispatch(postLike({ obj: { type: 'DOWNVOTE', idPost: id }, token }));
  };

  // handle avatar img
  const handleRedirectProfile = async () => {
    dispatch(setUserId(userId));
    history.push('/user-profile');
  };

  return (
    <Card
      style={{
        width: '908px',
        margin: '20px auto',
        borderRadius: '32px',
      }}
    >
      <Card.Body className={styles.postHolder}>
        <div className={styles.postHeader}>
          <Card.Img
            src={Avatar}
            style={{
              margin: '0 15px',
              width: '100px',
              height: '100px',
              cursor: 'pointer',
            }}
            onClick={() => handleRedirectProfile()}
          />
          <div>
            <div>
              <p style={{ fontWeight: 'bold' }}>{username}</p>
              <div className={styles.tags}>
                <p>
                  Accessibility:
                  {accessibilityTag}
                </p>
                <p>
                  Type:
                  {typeTag}
                </p>
              </div>
              <span>{date}</span>
              <Card.Text style={{ fontWeight: 'bold' }}>
                {description}
              </Card.Text>
            </div>
          </div>
        </div>
        <Card.Img
          src={ForestPost}
          onClick={handlePostId}
          alt="post_image"
          style={{ margin: '10px auto', maxWidth: '100%', cursor: 'pointer' }}
        />
        <div className={styles.interactionsHolder}>
          <div className={styles.interactions}>
            <span>
              {/* // eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
              <div role="presentation" onClick={handlePostLike}>
                <ThumbUpOffAltIcon />
                {upvotes}
              </div>
            </span>
            <span>
              <div role="presentation" onClick={handlePostDislike}>
                <ThumbDownOffAltIcon />
                {downvotes}
              </div>
            </span>
            <span>
              <ChatBubbleIcon />
              {comments}
            </span>
          </div>
          <div>
            <Card.Text style={{ fontWeight: 'bold' }}>
              Place name-(
              {location})
            </Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
