const PAGE_LENGTH = 20;

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
