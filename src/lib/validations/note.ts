import { z } from 'zod';

export const createNoteSchema = z.object({
    title:
        z.string()
            .min(1, "Title Required")
            .max(100),
    content: z
        .string()
        .min(1, "Content required")
        .max(1000),
})