import React, { FC, useEffect, useState } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { TextField } from '@mui/material';
import Navbar from '../../../features/home/Navbar';
import styles from './PostandComments.module.scss';
import ForestImg from '../../../assets/forestpost.png';
import AvatarImg from '../../../assets/avatar1.png';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  getLikeWithId,
  postLike,
} from '../../../features/home/homeScreenSlice';
import { getCommentWithId, postNewComment } from './PostAndCommentsSlice';

const PostAndComments: FC = () => {
  const [countLikes, setCountLikes] = useState(0);
  const [commentText, setCommentText] = useState<string>('');
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

  useEffect(() => {
    fetch('http://localhost:5000/comment', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    //  get /like /post /{id} testing
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
      const response = await dispatch(getCommentWithId({ postId: id, token }));
      console.log(response);
    };
    console.log(id);
    getComments();
    fetchLike();
  }, [countLikes]);

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
    await dispatch(postLike({ obj: { type: 'UPVOTE', idPost: id }, token }));
  };
  // post dislike
  const handlePostDislike = async () => {
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
                <ChatBubbleIcon />
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
                <ThumbUpOffAltIcon />
                {/* {upvotes} */}
                {countLikes}
              </span>
              <span>
                <ThumbDownOffAltIcon />
                {/* {downvotes} */}
                10
              </span>
              <span>
                <ChatBubbleIcon />
                {/* {comments} */}
                60
              </span>
            </div>
          </div>

          <div className={styles.publishComment}>
            <img src={AvatarImg} alt="comment" />
            <TextField
              multiline
              rows={7}
              id="outlined-basic"
              variant="outlined"
              placeholder="           Write a comment..."
              onChange={commentInput}
              sx={{
                minWidth: '374px',
                boxSizing: 'border-box',
                borderRadius: '16px',
              }}
            />
            <button type="button" onClick={() => postCommentText()}>
              Publish
            </button>
          </div>

          <div className={styles.publishedComments}>
            {/* TODO - MAKE COMPONENT FOR EACH COMMENT */}
            <div className={styles.oneComment}>
              <article>
                <img src={AvatarImg} alt="avatar" />
                <div>
                  <h4>@john.brown12</h4>
                  <span>02/03/2022</span>
                </div>
              </article>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquid, ad.
              </p>
              <hr />
            </div>

            <div className={styles.oneComment}>
              <article>
                <img src={AvatarImg} alt="avatar" />
                <div>
                  <h4>@john.brown12</h4>
                  <span>02/03/2022</span>
                </div>
              </article>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquid, ad.
              </p>
              <hr />
            </div>

            <div className={styles.oneComment}>
              <article>
                <img src={AvatarImg} alt="avatar" />
                <div>
                  <h4>@john.brown12</h4>
                  <span>02/03/2022</span>
                </div>
              </article>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquid, ad.
              </p>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostAndComments;
