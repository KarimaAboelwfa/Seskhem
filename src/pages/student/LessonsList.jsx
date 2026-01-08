import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLessons } from "../../api/student";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lessonLottie from "../../assets/characters/Alien_Reading.json";
import LessonsSkeleton from "../../components/skeletons/LessonsSkeleton";
import UserLayout from "../../components/layouts/UserLayout";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const gradients = [
    "from-pink-300 via-purple-300 to-indigo-400",
    "from-yellow-300 via-green-300 to-teal-400",
    "from-orange-300 via-red-300 to-pink-400",
    "from-blue-300 via-indigo-300 to-purple-400",
    "from-green-300 via-teal-300 to-lime-400",
];

export default function LessonsList() {
    const { unitSlug } = useParams();
    const navigate = useNavigate();

    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const res = await getLessons(unitSlug);
                console.log(res.data)
                setLessons(res.data || []);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load lessons");
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, [unitSlug]);

    if (loading) return <LessonsSkeleton />

    if (lessons.length === 0)
        return (
            <div className="text-center py-20">
                <Lottie animationData={lessonLottie} loop className="w-32 h-32 mx-auto mb-4" />
                <p className="text-xl font-bold text-gray-600">No lessons available!</p>
                <p className="text-gray-400 mt-2">Check back later or explore other units.</p>
            </div>
        );

    return (
        <UserLayout>
            <div className="p-6 space-y-6">
                {lessons.map((lesson, index) => {
                    const gradient = gradients[index % gradients.length];

                    return (
                        <motion.div
                            key={lesson.slug}
                            onClick={() => {
                                if (lesson.is_free === "yes") {
                                    navigate(`/lesson/${lesson.slug}`);
                                }
                            }}
                            className={`${lesson.is_free !== "yes" ? "bg-gray-400 cursor-not-allowed" : `bg-gradient-to-r ${gradient} cursor-pointer`} p-5 rounded-3xl shadow-2xl flex items-center gap-4`}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 120 }}
                            whileHover={lesson.is_free === "yes" ? { scale: 1.05 } : {}}
                        >
                            {/* Lottie Animation */}
                            <div className="w-16 h-16 flex-shrink-0">
                                <Lottie animationData={lessonLottie} loop />
                            </div>

                            {/* Lesson Info */}
                            <div className="flex-1">
                                <h3 className="text-white font-bold text-lg">{lesson.title}</h3>
                                <p className="text-white/90 text-sm mt-1">
                                    {lesson.lesson_type} • {lesson.estimated_time} min
                                </p>
                                {lesson.is_free !== "yes" && (
                                    <span className="flex items-center gap-1 text-red-500 font-bold mt-1">
                                        <LockClosedIcon className="w-5 h-5" />
                                        Locked
                                    </span>

                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </UserLayout>
    );
}
