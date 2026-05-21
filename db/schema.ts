import {
    pgTable,
    serial,
    text,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";

export const users = pgTable(
    "users",
    {
        id: serial("id").primaryKey(),

        clerkId: text("clerk_id")
            .notNull()
            .unique(),

        email: text("email")
            .notNull(),

        createdAt: timestamp(
            "created_at"
        ).defaultNow(),
    }
);


export const notes = pgTable(
    "notes",
    {
        id: serial("id").primaryKey(),

        title: text("title")
            .notNull(),

        content: text("content"),

        userId: integer("user_id")
            .references(() => users.id)
            .notNull(),

        createdAt: timestamp(
            "created_at"
        ).defaultNow(),
    }
);