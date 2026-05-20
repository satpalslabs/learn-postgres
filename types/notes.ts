export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export type User = {
  id: number;
  clerk_id: string;
  email: string;
}