export default function LessonContentSkeleton() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>

            {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 rounded-xl p-4 space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-40 bg-gray-300 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
}
