import { Note } from "../../types/notes";
import { syncUser } from "./sync-user";
import { db } from "../../db";
import { notes } from "../../db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getNotes(): Promise<Note[]> {
  const dbUser = await syncUser();
  return db.select().from(notes).where(eq(notes.userId, Number(dbUser?.id))).orderBy(desc(notes.createdAt))
}

export async function getNoteById(
  id: string
) {
  const dbUser = await syncUser();
  const result = await db.select().from(notes).where(
    and(
      eq(notes.id, Number(id)),
      eq(notes.userId, Number(dbUser?.id))
    ))
  return result[0];
}