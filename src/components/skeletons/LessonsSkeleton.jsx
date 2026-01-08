export default function LessonsSkeleton() {
    return (
        <div className="p-6 space-y-6">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 dark:bg-gray-700 rounded-3xl p-5 flex items-center gap-4 animate-pulse">
                    {/* Placeholder for Lottie */}
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>

                    {/* Placeholder for lesson info */}
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
