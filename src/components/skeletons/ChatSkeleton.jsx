import { SpeakerWaveIcon } from "@heroicons/react/24/solid";

export default function ChatSkeleton() {
    const skeletonMessages = [
        { isUser: false, width: "w-3/4" },
        { isUser: true, width: "w-2/3" },
        { isUser: false, width: "w-1/2" },
        { isUser: true, width: "w-2/5" },
        { isUser: false, width: "w-3/5" },
    ];

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {skeletonMessages.map((msg, i) => (
                <div
                    key={i}
                    className={`px-4 py-2 rounded-2xl animate-pulse
            ${msg.isUser ? "bg-indigo-300 ml-auto" : "bg-gray-300 mr-auto"}
            `}
                >
                    <div className={`h-4 ${msg.width} bg-gray-200 rounded mb-1`}></div>
                    <div className={`h-4 ${msg.width} bg-gray-200 rounded`}></div>

                    {!msg.isUser && (
                        <div className="mt-2 flex justify-end">
                            <div className="p-1 rounded-full bg-gray-200">
                                <SpeakerWaveIcon className="w-4 h-4 text-gray-300" />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
