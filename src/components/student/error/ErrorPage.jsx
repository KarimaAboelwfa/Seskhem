export default function ErrorPage({ message, code }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-800">
            <h1 className="text-6xl font-bold mb-4">{code || "Error"}</h1>
            <p className="text-xl mb-6">{message || "Something went wrong."}</p>
            <a
                href="/"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
                Go Home
            </a>
        </div>
    );
}
