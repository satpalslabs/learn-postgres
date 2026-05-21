import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* SIDEBAR */}
            <aside className="w-64 shrink-0 border-r p-6 mr-6">
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
            </aside>

            {/* CONTENT */}
            {children}
        </div>
    );
}