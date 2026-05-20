"use server";

import sql from "@/lib/db";
import { syncUser } from "@/lib/sync-user";
import { revalidatePath } from "next/cache";

export async function createNote(
  formData: FormData
) {
  const auth = await syncUser()
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await sql`
    INSERT INTO notes (title, content, user_id)
    VALUES (${title}, ${content}, ${auth?.id || ""})
  `;

  revalidatePath("/notes");
}

export async function deleteNote(
  formData: FormData
) {
  const id = formData.get("id") as string;
  const dbUser = await syncUser();

  await sql`
    DELETE FROM notes
    WHERE id = ${id} AND user_id = ${dbUser?.id || ""} 
  `;

  revalidatePath("/notes");
}
export async function editNote(
  formData: FormData
) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const dbUser = await syncUser();

  await sql`
    UPDATE notes SET title = ${title}, content = ${content}
    WHERE id = ${id} AND user_id = ${dbUser?.id || ""}                  
  `;

  revalidatePath("/notes");
}