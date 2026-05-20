"use client";

export default function ErrorPage({
    error,
}: {
    error: Error;
}) {
    return (
        <div className="p-10">
            <h2 className="text-red-500 text-2xl">
                Something went wrong
            </h2>

            <p>{error.message}</p>
        </div>
    );
}