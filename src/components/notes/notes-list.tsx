"use client"

import { Note } from "@/types/notes";
import NoteCard from "./note-card";
import { useOptimistic } from "react";
import NoteForm from "./create-note-form";

type NotesListProps = {
    notes: Note[];
};

export function NotesList({
    notes,
}: NotesListProps) {
    const [
        optimisticNotes,
        addOptimisticNote,
    ] = useOptimistic(
        notes,
        (state, newNote: Note) => [
            newNote,
            ...state,
        ]
    );

    return (
        <div className="grid grid-cols-2 gap-10 overflow-hidden grow">
            <NoteForm
                addOptimisticNote={
                    addOptimisticNote
                }
            />
            <div className="space-y-4 h-full overflow-auto ">
                {optimisticNotes.length == 0 ? <p>No notes yet</p> : optimisticNotes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                    />
                ))}
            </div>
        </div>
    );
}