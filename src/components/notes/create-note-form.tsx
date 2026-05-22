"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNoteSchema } from "@/lib/validations/note";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { Note } from "@/types/notes";
import { startTransition } from "react";
import { toast } from "sonner";
import { createNote } from "@/actions/notes-actions";

type CreateNoteValues =
    z.infer<typeof createNoteSchema>;


const NoteForm = ({
    addOptimisticNote
}: {
    addOptimisticNote: (note: Note) => void
}) => {
    const router = useRouter()
    const form = useForm<CreateNoteValues>({
        resolver: zodResolver(
            createNoteSchema
        ),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    async function onSubmit(
        values: CreateNoteValues
    ) {
        const optimisticNote = {
            id: Date.now(),
            title: values.title,
            content: values.content,
            createdAt:
                new Date(),
        };
        startTransition(() =>
            addOptimisticNote(
                optimisticNote
            )
        )
        const response =
            await createNote(values);

        if (!response.success) {
            toast.error(response.error);
            return;
        }

        router.refresh()
        form.reset();
        toast.success(
            "Note created"
        );


    }


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
            <Input
                label="Title"
                {...register("title")}
                error={errors.title?.message}
            />

            <Textarea
                label="Content"
                {...register("content")}
                error={errors.content?.message}
            />

            <button
                type="submit"
                disabled={isSubmitting}
                className="border px-4 py-2"
            >
                {isSubmitting
                    ? "Creating..."
                    : "Create Note"}
            </button>
        </form>
    );
}


export default NoteForm