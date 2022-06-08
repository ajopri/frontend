export default function Input({
    disabled = false,
    className,
    label,
    ...props
}) {
    return (
        <div className="flex flex-col">
            {label ? (
                <div className="pb-2 text-gray-500 uppercase text-xs">
                    {label}
                </div>
            ) : (
                ''
            )}
            <input
                disabled={disabled}
                className={`${className} w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300`}
                {...props}
            />
        </div>
    )
}
