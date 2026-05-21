type InputProps = {
    label: string;
    error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
    label,
    error,
    ...props
}: InputProps) {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium">
                {label}
            </label>

            <input
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