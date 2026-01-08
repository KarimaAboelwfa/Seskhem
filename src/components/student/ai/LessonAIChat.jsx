import { useEffect, useState, useRef } from "react";
import { getLessonChatHistory, sendChatMessage, textToSpeech } from "../../../api/ai";
import toast from "react-hot-toast";
import { PaperAirplaneIcon, SpeakerWaveIcon, XCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import ChatSkeleton from "../../skeletons/ChatSkeleton";

export default function LessonAIChat({ lessonSlug, onClose }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    const handlePlayAudio = async (text) => {
        try {
            setPlaying(true);

            const blob = await textToSpeech(text);
            const audioUrl = URL.createObjectURL(blob);

            // لو فيه صوت شغال، نوقفه
            if (audio) {
                audio.pause();
            }

            const newAudio = new Audio(audioUrl);
            setAudio(newAudio);

            newAudio.play();
            newAudio.onended = () => setPlaying(false);

        } catch (err) {
            console.error(err)
            toast.error("Failed to play audio");
            setPlaying(false);
        }
    };

    // Fetch chat history
    useEffect(() => {
        const loadChat = async () => {
            try {
                const res = await getLessonChatHistory(lessonSlug);
                // console.log("FULL RESPONSE:", res);

                const formattedMessages = res.history.map((msg) => ({
                    role: msg.role,
                    content: msg.content || msg.message,
                }));

                setMessages(formattedMessages);
            } catch (e) {
                console.error(e)
                toast.error("Failed to load chat");
            } finally {
                setLoading(false);
            }
        };

        loadChat();
    }, [lessonSlug]);

    // Send message
    const handleSend = async () => {
        if (!input.trim() || sending) return;

        const userMessage = { role: "user", content: input };
        const assistantMessage = { role: "assistant", content: "" };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setInput("");
        setSending(true);

        try {
            await sendChatMessage(lessonSlug, userMessage.content, (chunk) => {
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content += chunk;
                    return updated;
                });
            });
        } catch {
            toast.error("AI failed to respond");
        } finally {
            setSending(false);
        }
    };

    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 bg-black/40 flex justify-end z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>
                    <motion.div
                        className="w-full md:w-1/3 h-full bg-white flex flex-col shadow-2xl rounded-l-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                        <div className="p-4 border-b border-gray-400 flex justify-between items-center bg-gray-100">
                            <h2 className="flex items-center gap-2 font-bold text-lg">
                                <UserCircleIcon className="w-8 h-8" /> AI Tutor
                            </h2>
                            <motion.button
                                onClick={() => onClose()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-400 hover:text-red-600 cursor-pointer"
                            >
                                <XCircleIcon className="w-8 h-8" />
                            </motion.button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {loading ? (
                                <ChatSkeleton />
                            ) : (
                                messages.map((msg, i) => (
                                    <>
                                        <div
                                            key={i}
                                            className={`px-4 py-2 rounded-2xl max-w-[75%] whitespace-pre-wrap
                                        ${msg.role === "user"
                                                    ? "bg-indigo-500 text-white ml-auto"
                                                    : "bg-gray-200 text-gray-800 mr-auto"
                                                }`}
                                        >
                                            <motion.div initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {msg.content}
                                            </motion.div>

                                            {msg.role === "assistant" && (
                                                <motion.button
                                                    onClick={() => handlePlayAudio(msg.content)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    disabled={playing}
                                                    className={`text-sm mt-1
                                            ${playing ? "text-gray-400 cursor-not-allowed" : "cursor-pointer text-indigo-500 hover:text-indigo-600"}
                                            `}
                                                >
                                                    <SpeakerWaveIcon className="w-5 h-5" />
                                                </motion.button>
                                            )}
                                        </div>
                                        <div ref={chatEndRef} />
                                    </>
                                ))
                            )}
                        </div>

                        <div className="p-4 border-t border-gray-400 flex gap-2 bg-gray-100">
                            <input
                                value={input}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSend();
                                }}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 border border-gray-400 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Ask the AI about this lesson..."
                            />

                            <motion.button
                                onClick={handleSend}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={sending}
                                className={`text-white px-5 rounded-xl
                            ${sending ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"}
                            `}
                            >
                                <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
                            </motion.button>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
