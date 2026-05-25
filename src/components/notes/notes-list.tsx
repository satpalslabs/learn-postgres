"use client"

import { Note } from "@/types/notes";
import NoteCard from "./note-card";
import { useEffect, useOptimistic, useRef, useState } from "react";
import NoteForm from "./create-note-form";

type NotesListProps = {
    notes: Note[];
};

export function NotesList() {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [nextCursor, setNextCursor] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observerRef = useRef<HTMLDivElement | null>(null);


    const fetchMoreNotes = async (cursor?: number) => {
        try {
            setLoading(true)

            const res = await fetch(
                `/api/notes?cursor=${cursor}&limit=10`
            )
            const data = await res.json();
            if (!data.success) {
                return;
            }
            console.log(data)
            setNotes((prev) => [...prev, ...data.dbNotes])
            setNextCursor(data.nextCursor)
            if (!data.nextCursor) {
                setHasMore(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMoreNotes()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && !loading && hasMore) {
                fetchMoreNotes(nextCursor || undefined)
            }
        }, {
            threshold: 1
        })
        const currentRef =
            observerRef.current;

        if (currentRef) {
            observer.observe(currentRef)
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [nextCursor, loading, hasMore])

    return (
        <div className="grid grid-cols-2 gap-10 overflow-hidden grow">
            <NoteForm
                addOptimisticNote={(note) =>
                    setNotes(prev => [...prev, note])
                }
            />
            <div className="space-y-4 h-full overflow-auto ">
                {notes.length == 0 ? <p>No notes yet</p> : notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                    />
                ))}
                {loading && (
                    <p>Loading...</p>
                )}

                {!hasMore && (
                    <p>No more notes</p>
                )}

                <div
                    ref={observerRef}
                    className="h-10"
                />
            </div>
        </div>
    );
}