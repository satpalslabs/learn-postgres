import { NotesList } from "@/components/notes/notes-list";

export default async function NotesPage() {
    return (
        <main className="p-10 overflow-hidden h-screen flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-6">
                Notes
            </h1>
            <NotesList />
        </main>
    );
}