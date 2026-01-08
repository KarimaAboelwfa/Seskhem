import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import defaultSubjectImage from "../../assets/images/subject.jpeg";

export default function RecentSubjects({ subjects }) {
    const navigate = useNavigate();

    if (!subjects || subjects.length === 0) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-bold text-gray-600">
                    No recent subjects yet!
                </h2>
                <p className="text-gray-400 mt-2">
                    Start exploring your subjects to see them here.
                </p>
            </div>
        );
    }

    return (
        <>
            <h2 className="text-3xl font-semibold mb-4">Recent Subjects 📚</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {subjects?.map((subject, index) => (
                    <motion.div
                        key={subject.slug}
                        onClick={() => navigate(`/subjects/${subject.slug}`)}
                        className="cursor-pointer rounded-3xl shadow-2xl p-4 flex items-center gap-4 transition-transform"
                        style={{ borderLeft: `4px solid ${subject.color_code || "#6366f1"}` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* Subject Image */}
                        <img
                            src={subject.image || defaultSubjectImage}
                            alt={subject.title}
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
                        />

                        <div className="flex-1">
                            <p className="font-semibold text-lg">{subject.title}</p>

                            {/* Units count */}
                            {subject.unit_count !== undefined && (
                                <p className="text-sm text-gray-500 mt-1">
                                    {subject.unit_count} {subject.unit_count === 1 ? "Unit" : "Units"}
                                </p>
                            )}

                            {/* Progress Bar */}
                            {subject.progress !== undefined && (
                                <div className="flex">
                                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                                        <div
                                            className="bg-indigo-600 h-1 rounded-full"
                                            style={{ width: `${subject.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs ml-1 text-gray-500">{subject.progress}%</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

            </div>
        </>
    );
}
