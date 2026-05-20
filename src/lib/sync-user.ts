import { User } from "../../types/notes";
import sql from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser(): Promise<User | null> {
    const clerkUser = await currentUser();

    if (!clerkUser) {
        return null;
    }

    const existingUser = await sql`
    SELECT * FROM users
    WHERE clerk_id = ${clerkUser.id}
  ` as User[];

    if (existingUser.length > 0) {
        return existingUser[0];
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;

    const insertedUsers = await sql`
    INSERT INTO users (
        clerk_id,
        email
    )
    VALUES (
        ${clerkUser.id},
        ${email}
    )
    RETURNING *
  ` as User[];

    return insertedUsers[0];
}