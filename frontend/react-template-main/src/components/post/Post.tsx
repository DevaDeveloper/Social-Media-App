/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from 'react-bootstrap/Card';
import ForestPost from '../../assets/forestpost.png';
import Avatar from '../../assets/avatar1.png';
import styles from './Post.module.scss';
import {
  fetchOnePost,
  getPostLikes,
  postLike,
} from '../../features/home/homeScreenSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface CardProps {
  // eslint-disable-next-line react/no-unused-prop-types
  id: string;
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
  const [likes] = useState(upvotes);

  const dispatch = useAppDispatch();
  const history = useHistory();

  dispatch(getPostLikes(likes));

  const token = useAppSelector((state) => state.login.token);
  const handlePostId = async () => {
    setPostId(id);
    await dispatch(fetchOnePost({ token, postId }));

    history.push('/user-posts-postid');
  };

  // post like
  const handlePostLike = async () => {
    await dispatch(postLike({ obj: { type: 'UPVOTE', idPost: id }, token }));
  };
  // post dislike
  const handlePostDislike = async () => {
    await dispatch(postLike({ obj: { type: 'DOWNVOTE', idPost: id }, token }));
  };

  return (
    <Card
      style={{
        width: '908px',
        margin: '20px auto',
        borderRadius: '32px',
        cursor: 'pointer',
      }}
    >
      <Card.Body className={styles.postHolder}>
        <div className={styles.postHeader}>
          <Card.Img
            src={Avatar}
            style={{ margin: '0 15px', width: '100px', height: '100px' }}
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
          style={{ margin: '10px auto', maxWidth: '100%' }}
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
