/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { TextField } from '@mui/material';
import Navbar from '../../navbar/Navbar';
import styles from './PostandComments.module.scss';
import ForestImg from '../../../assets/forestpost.png';
import AvatarImg from '../../../assets/avatar1.png';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import OneComment from './OneComment';
import {
  getLikeWithId,
  postLike,
} from '../../../features/home/homeScreenSlice';
import { getCommentWithId, postNewComment } from './PostAndCommentsSlice';

const allInputLabelColors = {
  style: { color: '#000' },
};

const comments = [
  {
    img: AvatarImg,
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, ad.',
    date: '24/03/2022',
    username: '@john.brown12',
    id: '1',
  },
  {
    img: AvatarImg,
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, ad.',
    date: '29/03/2022',
    username: '@lela.test',
    id: '2',
  },
  {
    img: AvatarImg,
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, ad.',
    date: '30/03/2022',
    username: '@nemanja.12',
    id: '3',
  },
  {
    img: AvatarImg,
    text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, ad.',
    date: '30/03/2022',
    username: '@lela.16',
    id: '4',
  },
];

// TODO Make more smaller components

const PostAndComments: FC = () => {
  const [countLikes, setCountLikes] = useState(0);
  const [commentText, setCommentText] = useState<string>('');
  const [showComments, setShowComments] = useState(false);
  const [userReacted, setUserReacted] = useState(false);
  const token = useAppSelector((state) => state.login.token);
  const { postWithId } = useAppSelector((state) => state.userPosts);
  const dispatch = useAppDispatch();
  const {
    accessibility,
    createdAt,
    description,
    type,
    // comments,
    // downvotes,
    id,
    // idUser,
    // location,
  } = postWithId;

  const commentInput = (e) => {
    setCommentText(e.target.value);
  };
  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  useEffect(() => {
    //  get /like /post /{id} working
    const fetchLike = async () => {
      const response = await dispatch(
        getLikeWithId({
          postId: id,
          token,
        }),
      );
      setCountLikes(response.payload.count);
    };
    const getComments = async () => {
      await dispatch(getCommentWithId({ postId: id, token }));
    };
    getComments();
    fetchLike();
  }, [userReacted, countLikes]);

  const postCommentText = async () => {
    try {
      await dispatch(
        postNewComment({ obj: { idPost: id, text: commentText }, token }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // post like
  const handlePostLike = async () => {
    setUserReacted(!userReacted);
    await dispatch(postLike({ obj: { type: 'UPVOTE', idPost: id }, token }));
  };
  // post dislike
  const handlePostDislike = async () => {
    setUserReacted(!userReacted);
    await dispatch(postLike({ obj: { type: 'DOWNVOTE', idPost: id }, token }));
  };

  return (
    <div>
      <Navbar />
      <div className={styles.pageHolder}>
        <div className={styles.imgHolder}>
          <article>
            <span>
              Accessiblitiy:
              {accessibility}
            </span>
            <span>
              Type:
              {type}
            </span>
          </article>

          {/* reactions */}
          <div>
            <img src={ForestImg} alt="forest" />
            <div className={styles.interactions}>
              <button
                type="button"
                onClick={() => handlePostLike()}
                style={{
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                }}
              >
                <ThumbUpOffAltIcon />
                {/* {upvotes} */}
                {countLikes}
              </button>
              <button
                onClick={() => handlePostDislike()}
                type="button"
                style={{
                  cursor: 'pointer',
                  background: 'transparent',
                  border: 'none',
                }}
              >
                <ThumbDownOffAltIcon />
                {/* {downvotes} */}
                10
              </button>
              <span
                style={{
                  cursor: 'pointer',
                }}
              >
                <ChatBubbleOutlineIcon onClick={() => handleShowComments()} />
                {/* {comments} */}
                60
              </span>
            </div>
          </div>
        </div>

        {/* COMMENTS PART OF THE PAGE */}
        <div className={styles.commentsHolder}>
          <div>
            <div className={styles.mainInfo}>
              <img src={AvatarImg} alt="avatar" />
              <div>
                <h4>@john.brown12</h4>
                <span>{createdAt}</span>
              </div>
            </div>
            <h5 style={{ margin: '20px 0' }}>{description}</h5>
            <div className={styles.commentInteractions}>
              <span>
                <ThumbUpOffAltIcon
                  onClick={() => handlePostLike()}
                  sx={{ cursor: 'pointer' }}
                />
                {/* {upvotes} */}
                {countLikes}
              </span>
              <span>
                <ThumbDownOffAltIcon
                  onClick={() => handlePostDislike()}
                  sx={{ cursor: 'pointer' }}
                />
                {/* {downvotes} */}
                10
              </span>
              <span>
                <ChatBubbleOutlineIcon
                  onClick={() => handleShowComments()}
                  sx={{ cursor: 'pointer' }}
                />
                {/* {comments} */}
                60
              </span>
            </div>
          </div>

          {/* TODO Make more smaller components */}
          <div className={styles.publishComment}>
            <img src={AvatarImg} alt="comment" />
            <div
              style={{
                minWidth: '374px',
                borderRadius: '16px',
                border: '1px solid #EAEAF5',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TextField
                multiline
                rows={7}
                id="outlined-basic"
                variant="standard"
                placeholder="Write a comment..."
                onChange={commentInput}
                inputProps={allInputLabelColors}
                sx={{
                  maxWidth: '354px',
                  boxSizing: 'border-box',
                  borderRadius: '16px',
                }}
              />
            </div>
            <button type="button" onClick={() => postCommentText()}>
              Publish
            </button>
          </div>

          {showComments && (
            <div className={styles.publishedComments}>
              {/* TODO - MAKE COMPONENT FOR EACH COMMENT */}

              {comments.map((comment) => (
                <OneComment
                  text={comment.text}
                  date={comment.date}
                  username={comment.username}
                  key={comment.id}
                  img={comment.img}
                  // commentId={comment.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostAndComments;
