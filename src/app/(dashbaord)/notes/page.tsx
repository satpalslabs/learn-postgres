import NoteCard from "@/components/note-card";
import { getNotes } from "@/lib/queries";
import { createNote } from "./actions";

export default async function NotesPage() {
    const notes = await getNotes()

    return (
        <main className="p-10 overflow-hidden h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-6">
                Notes
            </h1>
            <div className="grid grid-cols-2 gap-10 overflow-hidden grow">
                <form
                    action={createNote}
                    className="space-y-4 mb-10 flex flex-col items-end h-full"
                >
                    <input
                        name="title"
                        placeholder="Title"
                        className="border p-2 w-full"
                    />

                    <textarea
                        name="content"
                        placeholder="Content"
                        className="border p-2 max-h-[500px] w-full field-sizing-content"
                        rows={3}
                    />

                    <button
                        className="bg-blue-400 text-white px-4 py-2 rounded-xl"
                    >
                        Create Note
                    </button>
                </form>

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