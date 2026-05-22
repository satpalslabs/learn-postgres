"use server"

import { db } from "@/db"
import { activityLogs, notes } from "@/db/schema"
import { and, asc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache";

type CreateNoteServiceInput = {
    title: string,
    content: string,
    userId: number
}

const getNoteByUserId = async (userId: number) => {
    const dbNotes = await db
        .select()
        .from(notes)
        .where(eq(notes.userId, userId))
        .orderBy(asc(notes.createdAt))

    return dbNotes
}


const createNoteService = async ({
    title,
    content,
    userId,
}: CreateNoteServiceInput) => {
    return await db.transaction(
        async (tx) => {
            const insertedNotes =
                await tx
                    .insert(notes)
                    .values({
                        title,
                        content,
                        userId,
                    })
                    .returning();
            await tx
                .insert(activityLogs)
                .values({
                    action:
                        "Created note",

                    userId,
                });

            return insertedNotes[0];
        })
}

async function deleteNoteService(
    id: number,
    userId: number
) {
    return await db.transaction(
        async (tx) => {
            const deletedNote = await
                tx.delete(notes)
                    .where(
                        and(
                            eq(notes.id, id),
                            eq(notes.userId, userId)
                        )
                    ).returning();

            await tx
                .insert(activityLogs)
                .values({
                    action:
                        "deleted note",

                    userId,
                });
            revalidatePath("/notes");
            return deletedNote
        })
}


async function editNoteService(
    values: { title: string, content: string },
    id: number,
    userId: number
) {
    return await db.transaction(
        async (tx) => {
            const note = await tx.update(notes).set(values)
                .where(
                    and(
                        eq(notes.id, id),
                        eq(notes.userId, userId)
                    )
                )
            await tx
                .insert(activityLogs)
                .values({
                    action:
                        "Updated note",
                    userId,
                });
            return note
        })

}

export { getNoteByUserId, createNoteService, deleteNoteService, editNoteService }