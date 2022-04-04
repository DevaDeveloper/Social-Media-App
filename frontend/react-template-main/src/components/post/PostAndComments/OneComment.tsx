import React, { FC } from 'react';
import styles from './PostandComments.module.scss';

interface CommentProps {
  text: string;
  //   id: string;
  username: string;
  date: string;
  img: any;
}

const OneComment: FC<CommentProps> = ({
  text,
  username,
  date,
  //   commentId,
  img,
}) => (
  <div className={styles.oneComment}>
    <article>
      <img src={img} alt="avatar" />
      <div>
        <h4>{username}</h4>
        <span>{date}</span>
      </div>
    </article>
    <p>{text}</p>
    <hr />
  </div>
);

export default OneComment;
