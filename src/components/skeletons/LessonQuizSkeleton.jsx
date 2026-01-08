export default function LessonQuizSkeleton() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>

            <div className="bg-gray-200 p-6 rounded-2xl space-y-4">
                <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto"></div>
                <div className="flex justify-center mb-4">
                    <div className="w-40 h-40 bg-gray-300 rounded-full"></div>
                </div>

                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="h-6 bg-gray-300 rounded w-full"></div>
                ))}

                <div className="h-10 bg-gray-300 rounded w-32 mx-auto mt-4"></div>
            </div>
        </div>
    );
}
