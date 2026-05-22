import { getNoteById } from "@/lib/queries";
import EditNoteForm from "@/components/notes/edit-note-form";
import { notFound } from "next/navigation";

export default async function EditNotePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const note = await getNoteById(id);

    if (!note) {
        notFound();
    }

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Edit Note
            </h1>
            <EditNoteForm note={note} />
        </main>
    );
}