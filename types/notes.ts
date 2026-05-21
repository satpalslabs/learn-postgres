export type Note = {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date | null;
};

export type User = {
  id: number;
  clerkId: string;
  email: string;
}