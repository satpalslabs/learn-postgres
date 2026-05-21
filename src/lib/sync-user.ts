import { db } from "../../db";
import { users } from "../../db/schema";
import { User } from "../../types/notes";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function syncUser(): Promise<User | null> {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        return null;
    }

    const existingUser = await db.select().from(users).where(eq(users.clerkId, clerkUser.id)).limit(1)

    if (existingUser.length > 0) {
        return existingUser[0];
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const insertedUsers = await db.insert(users).values({
        clerkId: clerkUser.id,
        email: email
    }).returning()

    return insertedUsers[0];
}