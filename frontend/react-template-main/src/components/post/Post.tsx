import React, { FC } from 'react';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Card from 'react-bootstrap/Card';
import ForestPost from '../../assets/forestpost.png';
import Avatar from '../../assets/avatar1.png';
import styles from './Post.module.scss';

interface CardProps {
  //   id: string;
  username: string;
  accessibilityTag: string;
  typeTag: string;
  date: string;
  description: string;
  upvotes: number;
  downvotes: number;
  comments: number;
}

const Post: FC<CardProps> = ({
  username,
  accessibilityTag,
  typeTag,
  date,
  description,
  upvotes,
  downvotes,
  comments,
}) => (
  <Card style={{ width: '908px', margin: '20px auto', borderRadius: '32px' }}>
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
            <Card.Text style={{ fontWeight: 'bold' }}>{description}</Card.Text>
          </div>
        </div>
      </div>
      <Card.Img
        src={ForestPost}
        alt="post_image"
        style={{ margin: '10px auto', maxWidth: '100%' }}
      />
      <div className={styles.interactionsHolder}>
        <div className={styles.interactions}>
          <span>
            <ThumbUpOffAltIcon />
            {upvotes}
          </span>
          <span>
            <ThumbDownOffAltIcon />
            {downvotes}
          </span>
          <span>
            <ChatBubbleIcon />
            {comments}
          </span>
        </div>
        <div>
          <Card.Text style={{ fontWeight: 'bold' }}>
            Place name (Place)
          </Card.Text>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default Post;
