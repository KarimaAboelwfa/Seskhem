import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessonContent } from "../../api/student";
import toast from "react-hot-toast";
import LessonContentSkeleton from "../../components/skeletons/LessonContentSkeleton";
import UserLayout from "../../components/layouts/UserLayout";
import { DocumentTextIcon, PaperAirplaneIcon, SpeakerWaveIcon, BoltIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import LessonAIChat from "../../components/student/ai/LessonAIChat"
import { explainContent } from "../../api/ai";
import { textToSpeech } from "../../api/ai";
import Lottie from "lottie-react";
import teachingAnimation from "../../assets/characters/Strawberry.json";

export default function LessonContent() {
    const { lessonSlug } = useParams();
    const navigate = useNavigate();

    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locked, setLocked] = useState(false);

    const [explainingId, setExplainingId] = useState(null);
    const [explanation, setExplanation] = useState("");
    const [explaining, setExplaining] = useState(false);

    const [showChat, setShowChat] = useState(false);

    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    const handleExplain = async (content) => {
        setExplainingId(content.order);
        setExplanation("");
        setExplaining(true);

        try {
            await explainContent(
                content.title,
                content.rich_text_content || content.title,
                (chunk) => {
                    setExplanation((prev) => prev + chunk);
                }
            );
        } catch (err) {
            console.error(err)
            toast.error("AI explanation failed");
        } finally {
            setExplaining(false);
        }
    };

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

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await getLessonContent(lessonSlug);
                // console.log(res.data)
                setLesson(res.data);
            } catch (err) {
                if (err.response?.status === 403) {
                    setLocked(true);
                } else {
                    toast.error("Failed to load lesson");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonSlug]);

    if (loading) return <LessonContentSkeleton />;

    if (locked) {
        return (
            <p className="text-center mt-10 text-red-500">
                🔒 This lesson is locked. Complete previous lessons first.
            </p>
        );
    }

    return (
        <UserLayout>
            <div className="p-8 max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold">{lesson.title}</h1>

                {/* CONTENT */}
                {lesson.contents?.length === 0 && (
                    <p className="text-gray-500">No content available for this lesson.</p>
                )}

                {[...lesson.contents]
                    .sort((a, b) => a.order - b.order)
                    .map((content, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow space-y-4"
                        >
                            <h3 className="font-semibold text-lg">
                                {content.title}
                            </h3>

                            <motion.button
                                onClick={() => handleExplain(content)}
                                disabled={explaining && explainingId === content.order}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-1 text-sm text-white px-2 py-1 rounded-lg
                                    ${explaining && explainingId === content.order ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"}
                                    `}
                            >
                                <BoltIcon className="w-5 h-5" />
                                {explaining && explainingId === content.order ? "Explaining..." : "Explain with AI"}
                            </motion.button>

                            {/* VIDEO */}
                            {content.content_type === "Video" && content.video_url && (
                                <iframe
                                    src={content.video_url}
                                    title={content.title}
                                    className="w-full h-64 rounded-xl"
                                    loading="lazy"
                                    allowFullScreen
                                />
                            )}

                            {/* PDF */}
                            {content.content_type === "PDF" && content.file && (
                                <motion.a
                                    href={content.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-500 text-white font-semibold flex items-center w-max p-2 rounded"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <DocumentTextIcon className="w-6 h-6" /> Open PDF File
                                </motion.a>
                            )}

                            {/* RICH TEXT */}
                            {content.content_type === "RichText" &&
                                content.rich_text_content && (
                                    <div className="relative w-full flex justify-center items-start mt-6">

                                        <div className="bg-gray-100 border border-gray-200 p-4 rounded-2xl max-w-md shadow-lg">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-gray-800 whitespace-pre-line">{content.rich_text_content}</p>

                                                <motion.button
                                                    onClick={() => handlePlayAudio(content.rich_text_content)}
                                                    disabled={playing}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`p-2 rounded-full transition
                                                    ${playing ? "cursor-not-allowed text-gray-400" : "text-indigo-500 hover:text-indigo-600 cursor-pointer"}`}
                                                >
                                                    <SpeakerWaveIcon className="w-5 h-5" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div className="w-36 h-36">
                                            <Lottie
                                                animationData={teachingAnimation}
                                                loop={true}
                                            />
                                        </div>
                                    </div>
                                )}

                            {explainingId === content.order && explanation && (
                                <div className="mt-4 bg-gray-100 border border-gray-200 p-4 rounded-xl text-gray-800 leading-relaxed">
                                    <h4 className="font-bold mb-2 text-indigo-600">
                                        AI Explanation
                                    </h4>
                                    <p className="whitespace-pre-line">{explanation}</p>

                                    <motion.button
                                        onClick={() => handlePlayAudio(explanation)}
                                        disabled={playing}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-2 rounded-full transition
                                                    ${playing ? "cursor-not-allowed text-gray-400" : "text-indigo-500 hover:text-indigo-600 cursor-pointer"}`}
                                    >
                                        <SpeakerWaveIcon className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            )}

                        </div>
                    ))}

                <div className="flex justify-end ml-auto">
                    <motion.button
                        onClick={() => navigate(`/quiz/${lesson.slug}`)}
                        className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2 rounded-2xl font-bold shadow-lg transition cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Start Quiz
                        <ArrowRightIcon className="w-6 h-6 " />
                    </motion.button>
                </div>

                <motion.button
                    onClick={() => setShowChat(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 fixed bottom-6 right-6 bg-indigo-500 text-white px-5 py-3 rounded-full shadow-lg cursor-pointer"
                >
                    Ask AI
                    <PaperAirplaneIcon className="w-5 h-5 " />
                </motion.button>

                {showChat && (
                    <LessonAIChat
                        lessonSlug={lessonSlug}
                        onClose={() => setShowChat(false)}
                    />
                )}

            </div>
        </UserLayout>
    );
}
