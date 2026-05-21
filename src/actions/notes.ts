"use server";

import { db } from '../../db'

import { notes } from "../../db/schema";

import { createNoteSchema } from "@/lib/validations/note";

import { syncUser } from "@/lib/sync-user";

import { revalidatePath } from "next/cache";

export async function createNote(
    values: unknown
) {
    const dbUser = await syncUser();

    if (!dbUser) {
        throw new Error(
            "Unauthorized"
        );
    }

    const validatedFields =
        createNoteSchema.safeParse(
            values
        );

    if (!validatedFields.success) {
        throw new Error(
            "Invalid fields"
        );
    }

    const { title, content } =
        validatedFields.data;

    await db.insert(notes).values({
        title,
        content,
        userId: dbUser.id,
    });

    revalidatePath("/notes");
}