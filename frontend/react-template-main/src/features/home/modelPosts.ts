interface UserPosts {
  id: string;
  username: string;
  accessibility: string;
  type: string;
  createdAt: string;
  description: string;
  idUser: string;
  likescount: string;
  location: string;
  downvotes: number;
  comments: number;
}

interface PostId {
  id: string;
  // username: string;
  accessibility: string;
  type: string;
  createdAt: string;
  description: string;
  idUser: string;
  likescount: string;
  location: string;
  downvotes: number;
  comments: number;
  // updatedAt: string
}

export type { UserPosts, PostId };
export default {};
