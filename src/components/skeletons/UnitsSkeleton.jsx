export default function UnitsSkeleton() {
    return (

        <div className="p-6 space-y-6">
            {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-gray-200 dark:bg-gray-700 rounded-3xl p-6 flex items-center gap-4 animate-pulse">
                    {/* Lottie placeholder */}
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div>

                    {/* Unit info placeholder */}
                    <div className="flex-1 space-y-3">
                        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                    </div>
                </div>
            ))}
        </div>


    );
}
