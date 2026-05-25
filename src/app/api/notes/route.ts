import { syncUser } from "@/lib/sync-user";
import { getNoteByUserId } from "@/services/notes.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const dbUser = await syncUser();

        if (!dbUser) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const { searchParams } = new URL(request.url)
        const cursor = searchParams.get('cursor');
        const limit = searchParams.get('limit');

        const result = await getNoteByUserId(dbUser.id, cursor ? parseInt(cursor) : undefined, limit ? Number(limit) : 10);
        console.log(result)
        return NextResponse.json(({
            success: true,
            ...result
        }));

    } catch (error) {
        console.log("error", error);
        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch notes",
            },
            {
                status: 500,
            }
        );
    }
}