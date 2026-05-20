import { editNote } from "../../actions";
import { getNoteById } from "@/lib/queries";

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const result = await getNoteById(id)

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Edit Note
            </h1>

            <form
                action={editNote}
                className="space-y-4 mb-10"
            >

                <input
                    name="id"
                    className="hidden"
                    defaultValue={result.id}
                />
                <input
                    name="title"
                    placeholder="Title"
                    className="border p-2 w-full"
                    defaultValue={result.title}
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    defaultValue={result.content}
                    className="border p-2 w-full"
                />

                <button
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Update Note
                </button>
            </form>
        </main>
    )
}