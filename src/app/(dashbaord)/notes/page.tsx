import NoteCard from "@/components/note-card";
import { db } from "../../../../db";
import { notes as noteSchema } from "../../../../db/schema";
import NoteForm from "@/components/forms/create-note-form";

export default async function NotesPage() {
    const notes = await db.select().from(noteSchema);
    return (
        <main className="p-10 overflow-hidden h-screen flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6">
                Notes
            </h1>
            <div className="grid grid-cols-2 gap-10 overflow-hidden grow">
                <NoteForm />
                {notes.length === 0 ? (
                    <p>No notes yet</p>
                ) : (
                    <div className="space-y-4 overflow-auto">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}