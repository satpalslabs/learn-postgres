import Link from "next/link";

import {
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r p-6 flex flex-col">
                <div>
                    <h2 className="text-2xl font-bold mb-8">
                        Dashboard
                    </h2>

                    <nav className="flex flex-col gap-4">
                        <Link href="/notes">
                            Notes
                        </Link>

                        <Link href="/profile">
                            Profile
                        </Link>

                        <Link href="/settings">
                            Settings
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto">
                    <SignInButton />
                    <UserButton />
                </div>
            </aside>

            <main className="flex-1 p-10">
                {children}
            </main>
        </div>
    );
}