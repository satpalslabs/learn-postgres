import { auth } from "@clerk/nextjs/server";
import { Note } from "../../types/notes";
import sql from "./db";
import { syncUser } from "./sync-user";

export async function getNotes(): Promise<Note[]> {
  const dbUser = await syncUser();

  return sql`
    SELECT * FROM notes WHERE user_id = ${dbUser?.id || ""} ORDER BY created_at DESC
  `;
}

export async function getNoteById(
  id: string
) {
  const dbUser = await syncUser();

  const result = await sql`
    SELECT * FROM notes
    WHERE id = ${id} AND user_id = ${dbUser?.id || ""} 
  `;

  return result[0] as Note;
}