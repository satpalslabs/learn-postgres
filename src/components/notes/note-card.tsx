import Link from 'next/link'
import { Note } from '@/types/notes';
import { deleteNote } from '@/actions/notes-actions';
import { toast } from 'sonner';

const NoteCard = ({ note }: { note: Note }) => {
    const handleDelete = async () => {
        const res = await deleteNote(note.id)
        if (!res.success) {
            toast.error(res.error)
            return;
        }
        toast.success("Note Deleted Successfully")
    }

    return (
        <div
            key={note.id}
            className="border p-4 rounded w-full flex flex-col gap-2"
        >
            <Link
                href={`/notes/${note.id}`}
            >
                <h2 className="font-bold text-3xl mb-6">
                    # {note.title}
                </h2>
            </Link>

            <pre className='w-full text-wrap'>{note.content}</pre>

            <div className="flex gap-6 items-center">
                <Link href={`/notes/${note.id}/edit`}
                    className="bg-green-500 text-white px-3 py-1 rounded mt-3 cursor-pointer"
                >
                    Edit
                </Link>
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-3 cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>)
}

export default NoteCard