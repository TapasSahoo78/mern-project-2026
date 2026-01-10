export interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}
