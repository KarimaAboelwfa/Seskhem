import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/student";
import defaultSubjectImage from "../../assets/images/subject.jpeg";
import UserLayout from "../../components/layouts/UserLayout";
import SubjectsList from "../../components/student/SubjectsList";
import Gamification from "../../components/student/Gamification";
import RecentSubjects from "../../components/student/RecentSubjects";
import ResumeLearning from "../../components/student/ResumeLearning";
import DashboardSkeleton from "../../components/skeletons/DashboardSkeleton";
import WelcomeSection from "../../components/student/WelcomeSection";
import AverageScore from "../../components/student/AverageScore";

export default function StudentDashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await getStudentDashboard();
                // console.log("Dashboard data from API:", res.data);
                setDashboard(res.data);
            } catch (err) {
                console.log(err);
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) return <DashboardSkeleton />

    if (error) return <ErrorPage message={error.message} code={error.code} />;

    const student_name = dashboard?.student_name || "Student";
    const gamification = {
        total_points: dashboard?.gamification?.total_points ?? 0,
        current_level: dashboard?.gamification?.current_level ?? 0,
        current_streak: dashboard?.gamification?.current_streak ?? 0,
        badges_count: dashboard?.gamification?.badges_count ?? 0,
    };
    const average_score = dashboard?.average_score ?? 0;
    const subjects = (dashboard?.subjects || []).map((subj) => ({
        title: subj.title || "No title",
        slug: subj.slug || "no-slug",
        image: subj.image
            ? subj.image
            : defaultSubjectImage,
        color_code: subj.color_code || "#6366f1",
        progress: subj.progress || 0,
        unit_count: subj.unit_count || null
    }));
    const resume_learning = {
        lesson_title: dashboard?.resume_learning?.lesson_title || "No lesson",
        lesson_slug: dashboard?.resume_learning?.lesson_slug || "no-lesson-slug",
        subject_title: dashboard?.resume_learning?.subject_title || "No subject",
        progress_percent: dashboard?.resume_learning?.progress_percent ?? 0,
    };

    return (
        <>
            <UserLayout>
                <div className="p-8 bg-gray-100 min-h-screen space-y-8">

                    <WelcomeSection name={student_name} />

                    {/* Gamification */}
                    {gamification && (
                        <Gamification
                            points={gamification.total_points}
                            level={gamification.current_level}
                            streakDays={gamification.current_streak}
                            badges={gamification.badges_count}
                        />
                    )}

                    <div className="w-full md:flex items-center gap-4 space-y-8 md:space-y-0">
                        {/* Average Score */}
                        <div className="flex-1">
                            <AverageScore average_score={average_score} />
                        </div>

                        {/* Resume Learning */}
                        <div className="flex-1">
                            <ResumeLearning lesson={resume_learning} />
                        </div>
                    </div>

                    {/* Recent Subjects */}
                    <RecentSubjects subjects={subjects} />

                    {/* Your Subjects */}
                    <SubjectsList />

                </div>
            </UserLayout>
        </>
    );
}
