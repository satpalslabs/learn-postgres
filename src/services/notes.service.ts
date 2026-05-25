"use server"

import { db } from "@/db"
import { activityLogs, notes } from "@/db/schema"
import { pusherServer } from "@/lib/pusher";
import { and, asc, desc, eq, lt } from "drizzle-orm"
import { revalidatePath } from "next/cache";

type CreateNoteServiceInput = {
    title: string,
    content: string,
    userId: number
}

const getNoteByUserId = async (userId: number, cursor?: number, limit: number = 10) => {
    const dbNotes = await db
        .select()
        .from(notes)
        .where(cursor ? and(
            eq(notes.userId, userId),
            lt(notes.id, cursor)
        ) : eq(notes.userId, userId))
        .orderBy(desc(notes.id))
        .limit(limit)
    console.log(dbNotes)

    const nextCursor =
        dbNotes.length === limit
            ? dbNotes[dbNotes.length - 1].id
            : null;

    return { dbNotes, nextCursor }
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
            await pusherServer.trigger(
                "notes-channel",
                "note-created",
                insertedNotes[0]
            );

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