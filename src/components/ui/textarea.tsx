type TextareaProps = {
    label: string;
    error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({
    label,
    error,
    ...props
}: TextareaProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium">
                {label}
            </label>

            <textarea
                {...props}
                className="w-full border rounded p-2"
            />

            {error && (
                <p className="text-red-500 text-sm">
                    {error}
                </p>
            )}
        </div>
    );
}