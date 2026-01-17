import {
    LockClosedIcon,
    CheckCircleIcon,
    PlayCircleIcon,
} from "@heroicons/react/24/solid";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import completedImg from "../../assets/images/completed.png";
import currentImg from "../../assets/images/current.png";
import lockedImg from "../../assets/images/locked.png";

export default function LessonNode({ title, side, status, type, progress, slug }) {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const colors = {
        completed: "bg-green-500 ring-4 ring-green-200",
        current: "bg-indigo-500 ring-4 ring-indigo-200",
        partial: "bg-yellow-400",
        locked: "bg-gray-300",
    };

    const images = {
        lesson: {
            completed: completedImg,
            current: currentImg,
            locked: lockedImg,
        },
    };

    const image =
        type === "lesson"
            ? images.lesson[status] || images.lesson.locked
            : null;

    const justifyClass =
        type === "unit" ? "justify-center" : side === "left" ? "justify-start pl-24" : "justify-end pr-24";

    const handleClick = () => {
        if (type === "lesson" && status !== "locked") {
            navigate(`/lesson/${slug}`);
        }
    };

    const handleMouseEnter = () => { setIsHovered(true); };
    const handleMouseLeave = () => { setIsHovered(false); };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className={`relative flex w-full ${justifyClass} cursor-pointer`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {type === "unit" ? (
                <div
                    className={`w-full p-4 rounded-full flex items-center justify-between shadow-xl z-10
                        ${status === "completed"
                            ? colors.completed
                            : status === "partial"
                                ? colors.partial
                                : colors.locked}`}
                >
                    <p className="text-white text-center font-semibold text-sm">{title}</p>

                    {progress !== undefined && (
                        <p className="text-white text-xs mt-1">{`Completed ${progress}%`}</p>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="bg-gray-100 w-24 h-24 flex items-center justify-center z-10"
                    >
                        <img
                            src={image}
                            alt={status}
                            className="w-full h-full object-contain drop-shadow-xl"
                        />
                    </motion.div>

                    {/* Animated Tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, x: side === "left" ? 10 : -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: side === "left" ? 10 : -10 }}
                                transition={{ duration: 0.2 }}
                                className={`
                                    absolute whitespace-nowrap px-4 py-2 text-sm font-medium text-white 
                                    bg-gray-800 rounded-lg shadow-lg z-30
                                    ${side === 'left' ? 'right-full mr-3' : 'left-full ml-3'}
                                    top-1/2 -translate-y-1/2
                                `}
                            >
                                {title}

                                <div className={`
                                    absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rotate-45
                                    ${side === 'left' ? '-right-1.5' : '-left-1.5'}
                                `}></div>

                                <div className="flex items-center justify-center gap-1 mt-1 text-xs font-medium">
                                    {status === "completed" && (
                                        <>
                                            <CheckCircleIcon className="w-4 h-4 text-green-400 animate-bounce" />
                                            <span className="text-green-300">Completed</span>
                                        </>
                                    )}

                                    {status === "current" && (
                                        <>
                                            <PlayCircleIcon className="w-4 h-4 text-indigo-300 animate-pulse" />
                                            <span className="text-indigo-300">In Progress</span>
                                        </>
                                    )}

                                    {status === "locked" && (
                                        <>
                                            <LockClosedIcon className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-300">Locked</span>
                                        </>
                                    )}
                                </div>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}
