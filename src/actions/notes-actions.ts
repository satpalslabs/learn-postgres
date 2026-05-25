"use server";

import { syncUser } from "@/lib/sync-user";
import { createNoteSchema } from "@/lib/validations/note";
import { createNoteService, deleteNoteService, editNoteService, getNoteByUserId } from "@/services/notes.service";
import { Note } from "@/types/notes";
import { revalidatePath } from "next/cache";

async function createNote(
    values: {
        title: string,
        content: string
    }
) {
    try {
        const dbUser =
            await syncUser();

        if (!dbUser) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const validated =
            createNoteSchema.safeParse(
                values
            );

        if (!validated.success) {
            return {
                success: false,
                error:
                    "Invalid fields",
            };
        }

        const note =
            await createNoteService({
                ...validated.data,
                userId: dbUser.id,
            });

        revalidatePath("/notes");

        return {
            success: true,
            data: note,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error:
                "Failed to create note",
        };
    }
}

async function editNote(
    values: {
        title: string,
        content: string
    },
    id: number
) {
    try {
        const dbUser =
            await syncUser();

        if (!dbUser) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const validated =
            createNoteSchema.safeParse(
                values
            );

        if (!validated.success) {
            return {
                success: false,
                error:
                    "Invalid fields",
            };
        }
        const { title, content } = validated.data;

        const note =
            await editNoteService({
                title, content
            },
                id,
                dbUser.id
            );

        revalidatePath("/notes");

        return {
            success: true,
            data: note,
        };
    } catch (error) {
        return {
            success: false,
            error:
                "Failed to update note",
        };
    }
}

const getNotes = async () => {
    try {
        const notes = await fetch("/api/notes")
        const data = await notes.json()
        return data;
    } catch (er) {
        console.log(er)
        return {
            success: false,
            error:
                "Failed to fetch notes",
        };
    }

}

const deleteNote = async (id: number) => {
    try {
        const dbUser = await syncUser();
        if (!dbUser) {
            throw new Error("Unauthorized")
        }
        const note = await deleteNoteService(id, dbUser.id)

        return {
            success: true,
            data: note
        };

    } catch (er) {
        return {
            success: false,
            error:
                "Failed to Delete note",
        };
    }

}
export { createNote, getNotes, editNote, deleteNote }

