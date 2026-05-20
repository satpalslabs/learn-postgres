import { getNoteById } from "@/lib/queries";

export default async function NotePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const singleNote = await getNoteById(id)

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold">
                {singleNote.title}
            </h1>

            <p className="mt-4">
                {singleNote.content}
            </p>
        </main>
    );
}