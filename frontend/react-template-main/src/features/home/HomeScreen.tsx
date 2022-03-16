import React, { FC, useState } from 'react';
import Navbar from './Navbar';
import Post from '../../components/post/Post';

const DUMMY_POSTS = [
  {
    id: 1,
    username: '@john.brown12',
    postDate: new Date().toString(),
    accessibilityTag: 'By car',
    typeTag: 'Picnic',
    description: 'description about this post',
    upvotes: 120,
    downvotes: 10,
    comments: 17,
  },
  {
    id: 2,
    username: '@nick.bitcoin12',
    postDate: new Date().toString(),
    accessibilityTag: 'By bike',
    typeTag: 'IDK type',
    description: 'description about second post',
    upvotes: 56,
    downvotes: 7,
    comments: 30,
  },
  {
    id: 3,
    username: '@john.brown12',
    postDate: new Date().toString(),
    accessibilityTag: 'By car',
    typeTag: 'Picnic',
    description: 'description about this post',
    upvotes: 120,
    downvotes: 10,
    comments: 17,
  },
];
const HomeScreen: FC = () => {
  const [userPosts] = useState(DUMMY_POSTS);
  return (
    <div>
      <Navbar />
      <ul>
        {userPosts.map((post) => (
          <Post
            // id={post.id.toString()}
            key={post.id}
            username={post.username}
            date={post.postDate}
            accessibilityTag={post.accessibilityTag}
            typeTag={post.typeTag}
            description={post.description}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            comments={post.comments}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
