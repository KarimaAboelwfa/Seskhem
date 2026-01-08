import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonQuiz, submitLessonQuiz } from "../../api/student";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import quizCharacter from "../../assets/characters/owl2.json";
import LessonQuizSkeleton from "../../components/skeletons/LessonQuizSkeleton";
import UserLayout from "../../components/layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import {
    CheckCircleIcon,
    XCircleIcon,
    ArrowLeftIcon,
    SpeakerWaveIcon,
} from "@heroicons/react/24/solid";
import { textToSpeech } from "../../api/ai";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function LessonQuiz() {
    const navigate = useNavigate();
    const { lessonSlug } = useParams();

    const [lesson, setLesson] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [locked, setLocked] = useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    const isQuizComplete =
        lesson?.quiz_questions?.every((q) => answers[q.id]);

    const [result, setResult] = useState(null);

    const getScoreColor = (score) => {
        if (score >= 85) return "text-green-600";
        if (score >= 60) return "text-yellow-500";
        return "text-red-500";
    };

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await getLessonQuiz(lessonSlug);
                console.log("dataaaaaaa", res.data)
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

    const handleSelect = (questionId, optionId) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: optionId,
        }));
    };

    const [feedback, setFeedback] = useState(null);

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

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const res = await submitLessonQuiz(lessonSlug, answers);
            setFeedback(res.data.feedback);
            setResult({
                score: res.data.score,
                points: res.data.points_earned,
            });

            if (res.data.already_completed) {
                toast("You already completed this lesson");
            } else {
                toast.success(
                    `Score: ${res.data.score}% • +${res.data.points_earned} points 🎉`
                );
            }

        } catch {
            toast.error("Submit failed");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <LessonQuizSkeleton />

    if (locked)
        return (
            <p className="text-center mt-10 text-red-500">
                🔒 This lesson is locked. Complete previous lessons first.
            </p>
        );

    return (
        <UserLayout>
            <div className="p-8 max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold">{lesson.title}</h1>

                {/* QUIZ */}
                {lesson.quiz_questions?.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow space-y-6">
                        <h2 className="text-xl font-bold text-center">
                            {feedback ? "Quiz Result" : "Quiz"}
                        </h2>

                        <div className="flex flex-col items-center relative">
                            {/* Speech bubble */}
                            {!feedback && lesson.quiz_questions[currentQuestionIndex] && (
                                <div className="relative bg-indigo-100 text-indigo-900 px-4 py-3 rounded-2xl max-w-xl text-center mb-4">
                                    <div className="flex items-center">
                                        {lesson.quiz_questions[currentQuestionIndex].text}
                                        <motion.button
                                            onClick={() => handlePlayAudio(lesson.quiz_questions[currentQuestionIndex].text)}
                                            disabled={playing}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`px-2 rounded-full transition
                                                    ${playing ? "cursor-not-allowed text-gray-400" : "text-indigo-500 hover:text-indigo-600 cursor-pointer"}`}
                                        >
                                            <SpeakerWaveIcon className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                    <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-100 rotate-45"></div>
                                </div>
                            )}

                            {/* Character Lottie */}
                            <Lottie animationData={quizCharacter} loop className="w-40 h-40 -mt-10" />
                        </div>

                        {/* Options */}
                        {!feedback && lesson.quiz_questions[currentQuestionIndex] && (
                            <div className="space-y-4 mt-4">
                                {lesson.quiz_questions[currentQuestionIndex].options.map((opt) => (
                                    <label
                                        key={opt.id}
                                        className="flex items-center gap-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-lg"
                                    >
                                        <input
                                            type="radio"
                                            disabled={!!feedback}
                                            name={`question-${lesson.quiz_questions[currentQuestionIndex].id}`}
                                            checked={
                                                answers[lesson.quiz_questions[currentQuestionIndex].id] === opt.id
                                            }
                                            onChange={() =>
                                                handleSelect(
                                                    lesson.quiz_questions[currentQuestionIndex].id,
                                                    opt.id
                                                )
                                            }
                                        />
                                        {opt.text}
                                    </label>
                                ))}

                                {/* Feedback */}
                                {feedback &&
                                    feedback[lesson.quiz_questions[currentQuestionIndex].id] && (
                                        <p
                                            className={
                                                feedback[lesson.quiz_questions[currentQuestionIndex].id]
                                                    .is_correct
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {feedback[lesson.quiz_questions[currentQuestionIndex].id].is_correct
                                                ? "✔ Correct"
                                                : "✖ Wrong"}
                                        </p>
                                    )}

                                {/* Next Button */}
                                {!feedback && currentQuestionIndex < lesson.quiz_questions.length - 1 && (
                                    <button
                                        onClick={() =>
                                            setCurrentQuestionIndex((prev) => prev + 1)
                                        }
                                        disabled={
                                            !answers[lesson.quiz_questions[currentQuestionIndex].id]
                                        }
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        )}

                        {!feedback &&
                            currentQuestionIndex === lesson.quiz_questions.length - 1 && (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting || !isQuizComplete}
                                    className={`px-6 py-2 rounded-xl transition
                                    ${submitting || !isQuizComplete
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"
                                        }`}
                                >
                                    {submitting ? "Submitting..." : "Submit Quiz"}
                                </button>
                            )}

                        {feedback && (
                            <div className="bg-gradient-to-br from-indigo-100 via-pink-100 to-yellow-100 p-8 rounded-3xl shadow-2xl space-y-8">

                                {/* Result Summary */}
                                <div className="text-center bg-white rounded-3xl p-6 shadow-md">
                                    <h2 className="text-2xl font-bold text-indigo-600 mb-2">
                                        Quiz Completed!
                                    </h2>

                                    <div className="text-lg font-bold">
                                        <p>Score : <span className={`font-semibold ${getScoreColor(result.score)}`}>
                                            {result.score.toFixed(2)}%
                                        </span></p>

                                        <p>Points Earned : <span className="font-semibold text-yellow-500"> {result.points}</span></p>
                                    </div>
                                </div>

                                {/* Questions Feedback */}
                                <div className="space-y-5">
                                    {lesson.quiz_questions.map((q, index) => {
                                        const fb = feedback[q.id];
                                        const isCorrect = fb?.is_correct;

                                        return (
                                            <div
                                                key={q.id}
                                                className={`rounded-3xl p-5 shadow-md border-2
                                                ${isCorrect
                                                        ? "bg-green-50 border-green-300"
                                                        : "bg-red-50 border-red-300"}`}
                                            >
                                                {/* Question */}
                                                <p className="font-semibold text-gray-800 mb-2">
                                                    {index + 1}. {q.text}
                                                </p>

                                                {/* Result */}
                                                <div className="flex items-center gap-2 text-lg font-bold">
                                                    {isCorrect ? (
                                                        <>
                                                            <span className="text-green-600 text-2xl"><CheckCircleIcon className="w-7 h-7 text-green-600" />
                                                            </span>
                                                            <span className="text-green-600">Correct! Great job</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-red-600 text-2xl"><XCircleIcon className="w-7 h-7 text-red-500" />
                                                            </span>
                                                            <span className="text-red-600">Oops! Try again</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Back Button */}
                                <button
                                    onClick={() => navigate(-1)}
                                    className="flex items-center gap-2 bg-indigo-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 transition cursor-pointer"
                                >
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    Back to Lesson
                                </button>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </UserLayout>
    );
}
