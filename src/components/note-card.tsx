import { Note } from '../../types/notes'
import Link from 'next/link'
import { deleteNote } from '@/app/(dashbaord)/notes/actions'

const NoteCard = ({ note }: { note: Note }) => {
    return (
        <div
            key={note.id}
            className="border p-4 rounded w-full flex flex-col gap-2"
        >
            <Link
                href={`/notes/${note.id}`}
            >
                <h2 className="font-bold">
                    {note.title}
                </h2>
            </Link>

            <pre className='w-full text-wrap'>{note.content}</pre>

            <div className="flex gap-6 items-center">
                <Link href={`/notes/${note.id}/edit`}
                    className="bg-green-500 text-white px-3 py-1 rounded mt-3 cursor-pointer"
                >
                    Edit
                </Link>

                <form action={deleteNote}>
                    <input
                        type="hidden"
                        name="id"
                        value={note.id}
                    />

                    <button
                        className="bg-red-500 text-white px-3 py-1 rounded mt-3 cursor-pointer"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </div>)
}

export default NoteCard