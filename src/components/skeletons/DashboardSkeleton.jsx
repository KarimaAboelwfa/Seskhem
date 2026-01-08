export default function DashboardSkeleton() {
    return (
        <div className="p-8 space-y-8 animate-pulse">
            {/* Title */}
            <div className="h-8 w-64 bg-gray-300 rounded"></div>

            {/* Gamification */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-24 bg-gray-300 rounded-2xl"></div>
                ))}
            </div>

            {/* Average Score */}
            <div className="h-24 bg-gray-300 rounded-2xl w-60"></div>

            {/* Recent Subjects */}
            <div className="space-y-4">
                <div className="h-6 w-40 bg-gray-300 rounded"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-32 bg-gray-300 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
