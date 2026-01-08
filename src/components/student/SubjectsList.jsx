import { getSubjects, getEnrollmentStatus } from "../../api/student";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../../assets/images/subject.jpeg";
import noSubjects from "../../assets/images/sadBrain.jpeg";
import SubjectsSkeleton from "../skeletons/SubjectsSkeleton";

export default function SubjectsList() {
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // Get enrollment status
                const enrollmentRes = await getEnrollmentStatus();

                const setup = enrollmentRes.data?.current_setup;
                if (!setup) {
                    throw new Error("No enrollment setup");
                }

                const { grade, term } = setup;

                // Get subjects
                const subjectsRes = await getSubjects(grade, term);

                // console.log("SUBJECTS RESPONSE:", subjectsRes.data);

                // Save subjects (array مباشر)
                setSubjects(subjectsRes.data || []);
            } catch (err) {
                console.log(err);
                setError("Failed to load subjects");
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    if (loading) return <SubjectsSkeleton />;

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">Your Subjects 📚</h1>

            {subjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <img
                        src={noSubjects}
                        alt="No subjects"
                        className="w-48 h-48 object-cover rounded-full mb-6 shadow-lg"
                    />
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">
                        No subjects available
                    </h2>
                    <p className="text-gray-500">
                        It looks like you haven't been assigned any subjects yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {subjects.map((subject) => (
                        <div
                            key={subject.slug}
                            onClick={() => navigate(`/subjects/${subject.slug}`)}
                            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition p-4"
                            style={{ borderLeft: `4px solid ${subject.color_code || "#6366f1"}` }}
                        >
                            <img
                                src={subject.image || defaultImage}
                                alt={subject.title}
                                className="object-cover rounded-xl mb-4"
                            />

                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{subject.title}</h3>
                                <span className="text-sm text-gray-500">
                                    {subject.grade_title} {subject.term_title && `- ${subject.term_title}`}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mt-2">
                                {subject.description || "No description available"}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
