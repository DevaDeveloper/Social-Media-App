/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from 'react-bootstrap/Card';
import { unwrapResult } from '@reduxjs/toolkit';
import ForestPost from '../../assets/forestpost.png';
import Avatar from '../../assets/avatar1.png';
import styles from './Post.module.scss';
import Modal from '../modal/Modal';
import {
  fetchOnePost,
  postLike,
  setUserId,
} from '../../features/home/homeScreenSlice';
import { deletePostId } from '../../features/newPost/newPostSlice';
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
  const { token, currentUser } = useAppSelector((state) => state.login);
  const errMessage = useAppSelector((state) => state.userPosts.errMessage);
  const [modal, setModal] = useState(false);
  const params = useParams();

  useEffect(() => {}, [upvotes]);

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  const handlePostId = () => {
    setPostId(id);
    dispatch(fetchOnePost({ token, postId }))
      .then(unwrapResult)
      .then(() => history.push('/user-posts-postid'))
      .catch(() => console.error(errMessage));
  };
  const handleDeletePost = () => {
    setPostId(id);
    dispatch(deletePostId({ postId, token }))
      .then(unwrapResult)
      .then(() => setModal(false))
      .then(() => console.log('post deleted!'))
      .catch((err) => console.error(err));
  };

  // post like
  const handlePostLike = async () => {
    try {
      await dispatch(postLike({ obj: { type: 'UPVOTE', idPost: id }, token }));
    } catch (error) {
      console.log(error);
    }
  };
  // post dislike
  const handlePostDislike = async () => {
    try {
      await dispatch(
        postLike({ obj: { type: 'DOWNVOTE', idPost: id }, token }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  // handle avatar img
  const handleRedirectProfile = async () => {
    dispatch(setUserId(userId));
    history.push(`/user-profile/${userId}`);
  };

  return (
    <>
      <Card
        style={{
          width: '908px',
          margin: '20px auto',
          borderRadius: '32px',
        }}
      >
        <Card.Body className={styles.postHolder}>
          <div className={styles.postHeader}>
            <div className={styles.firstPart}>
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
            {/* DELETE USER */}
            <div>
              {currentUser.id === idUser && (
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => handleOpenModal()}
                >
                  <DeleteIcon />
                </button>
              )}
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
                <div role="presentation" onClick={() => handlePostLike()}>
                  <ThumbUpOffAltIcon sx={{ cursor: 'pointer' }} />
                  {upvotes}
                </div>
              </span>
              <span>
                <div role="presentation" onClick={() => handlePostDislike()}>
                  <ThumbDownOffAltIcon sx={{ cursor: 'pointer' }} />
                  {downvotes}
                </div>
              </span>
              <span>
                <ChatBubbleIcon sx={{ cursor: 'pointer' }} />
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
      {modal && (
        <Modal
          handleAction={handleDeletePost}
          handleCloseModal={handleCloseModal}
          text="Are you sure you want to delete this post?"
        />
      )}
    </>
  );
};

export default Post;
