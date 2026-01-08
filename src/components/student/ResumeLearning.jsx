import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import boardLottie from "../../assets/characters/owl_board.json";

export default function ResumeLearning({ lesson }) {
    const navigate = useNavigate();

    if (!lesson?.lesson_slug) {
        return (
            <motion.div
                className="bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 text-white py-6 px-6 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            >
                <h3 className="font-bold text-lg">No lessons to continue!</h3>
                <p className="text-sm text-white/90 text-center">
                    Explore your subjects to start learning and see lessons here.
                </p>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 text-white py-3 px-6 rounded-3xl shadow-2xl flex items-center justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.03 }}
        >
            {/* Left: Lottie Animation */}
            <div className="w-24 h-24">
                <Lottie animationData={boardLottie} loop />
            </div>

            {/* Center: Lesson Info */}
            <div className="flex-1">
                <h3 className="font-bold text-lg">Continue Learning</h3>
                <p className="mt-1 text-sm font-semibold">
                    {lesson.lesson_title} -
                    <span className="text-xs opacity-90">{lesson.subject_title}</span>
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-white/30 h-1 rounded-full mt-3 overflow-hidden">
                    <motion.div
                        className="h-1 rounded-full bg-white"
                        initial={{ width: 0 }}
                        animate={{ width: `${lesson.progress_percent}%` }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Right: Resume Button */}
            <button
                onClick={() => navigate(`/lesson/${lesson.lesson_slug}`)}
                className="mt-3 bg-white text-indigo-500 px-4 py-2 rounded-2xl font-bold shadow-lg hover:scale-105 hover:bg-yellow-300 transition-transform cursor-pointer"
            >
                Resume
            </button>
        </motion.div>
    );
}
