
export interface Post {
  id: string;
  caption: string;
  image_url: string | null;
  user_id: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  post_id: string;
  user_id: string;
}
