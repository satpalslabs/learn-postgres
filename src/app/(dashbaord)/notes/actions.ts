"use server";

import { syncUser } from "@/lib/sync-user";
import { revalidatePath } from "next/cache";
import { db } from "../../../../db";
import { notes } from "../../../../db/schema";
import { and, eq } from "drizzle-orm";
import { createNoteSchema } from "@/lib/validations/note";

export async function createNote(
  formData: FormData
) {
  const auth = await syncUser()

  if (!auth) {
    throw new Error("Unauthorized")
  }

  const rowData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string
  }

  const validatedFields = createNoteSchema
    .safeParse(
      rowData
    )

  if (!validatedFields.success) {
    throw new Error("Invalid FIelds")
  }


  const { title, content } = validatedFields.data;

  await db.insert(notes).values({
    title,
    content,
    userId: Number(auth?.id)
  });

  revalidatePath("/notes");
}

export async function deleteNote(
  formData: FormData
) {
  const id = formData.get("id") as string;
  const dbUser = await syncUser();

  await db.delete(notes).where(and(eq(notes.id, Number(id)), eq(notes.userId, Number(dbUser?.id))))
  revalidatePath("/notes");
}
export async function editNote(
  formData: FormData
) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const dbUser = await syncUser();


  await db.update(notes).set({
    title, content
  }).where(and(eq(notes.id, Number(id)), eq(notes.userId, Number(dbUser?.id))))


  revalidatePath("/notes");
}