export default function SubjectsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-300 h-64 rounded-2xl"></div>
            ))}
        </div>
    );
}
