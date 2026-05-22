"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createNoteSchema } from "@/lib/validations/note";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { Note } from "@/types/notes";
import { editNote } from "@/actions/notes-actions";
import { toast } from "sonner";

type EditNoteValues = z.infer<typeof createNoteSchema>;

export default function EditNoteForm({ note }: { note: Note }) {
    const router = useRouter();
    const form = useForm<EditNoteValues>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: note.title,
            content: note.content || "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    async function onSubmit(values: EditNoteValues) {
        const res = await editNote(values, note.id);
        if (!res.success) {
            toast.error(res.error)
            return;
        }
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 w-[800px]"
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
                className="border px-4 py-2 cursor-pointer"
            >
                {isSubmitting
                    ? "Updating..."
                    : "Update Note"}
            </button>
        </form>
    );
}
