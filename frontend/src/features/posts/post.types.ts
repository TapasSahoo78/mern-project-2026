export interface Post {
  _id: string;
  title: string;
  content: string;
  slug: string;
  author: {
    name: string;
    email: string;
  };
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
   page: number;
  totalPages: number;
}
