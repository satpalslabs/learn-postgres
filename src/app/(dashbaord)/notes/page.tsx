import { getNotes } from "@/actions/notes-actions";
import { NotesList } from "@/components/notes/notes-list";
import { notFound } from "next/navigation";

export default async function NotesPage() {
    const res = await getNotes();
    const notes = res?.data;

    if (!res.success) {
        notFound()
    }

    return (
        <main className="p-10 overflow-hidden h-screen flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6">
                Notes
            </h1>
            <NotesList notes={notes || []} />
        </main>
    );
}