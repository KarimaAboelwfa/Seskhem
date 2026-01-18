import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getSubjectDetails } from "../../api/student";
import UserLayout from "../../components/layouts/UserLayout";
import LessonNode from "../../components/student/LessonNode";
import Lottie from "lottie-react";
import characterRight from "../../assets/characters/owl2.json";
import characterLeft from "../../assets/characters/owl_board.json";

export default function SubjectDetails() {
    const { subjectSlug } = useParams();

    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);

    const nodeRefs = useRef([]);
    const [positions, setPositions] = useState([]);
    const timelineRef = useRef(null);

    useEffect(() => {
        getSubjectDetails(subjectSlug)
            .then(res => {
                console.log("Subject Data:", res.data);
                setSubject(res.data);
            })
            .catch(err => {
                console.error("Error fetching subject:", err);
            })
            .finally(() => setLoading(false));
    }, [subjectSlug]);

    // ===== BUILD TIMELINE =====
    const timeline = useMemo(() => {
        if (!subject?.units) return [];

        const result = [];

        subject.units.forEach((unit) => {
            let unitStatus = "locked";
            if (unit.is_locked === false && unit.progress === 100) unitStatus = "completed";
            else if (unit.is_locked === false && unit.progress !== 100) unitStatus = "partial";

            result.push({
                type: "unit",
                title: unit.title,
                slug: unit.slug,
                status: unitStatus,
                progress: unit.progress,
            });

            unit.lessons.forEach((lesson) => {
                result.push({
                    type: "lesson",
                    title: lesson.title,
                    slug: lesson.slug,
                    status: lesson.is_locked
                        ? "locked"
                        : lesson.is_completed
                            ? "completed"
                            : "current",
                });
            });
        });

        return result;
    }, [subject]);

    // ===== CALCULATE NODE POSITIONS =====
    useEffect(() => {
        if (!timelineRef.current) return;

        const containerRect = timelineRef.current.getBoundingClientRect();

        const newPositions = nodeRefs.current.map((el) => {
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return {
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top + rect.height / 2,
            };
        });

        setPositions(newPositions);
    }, [timeline]);

    if (loading)
        return (
            <UserLayout>
                <div className="p-8 space-y-6 animate-pulse">
                    <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </UserLayout>
        );

    return (
        <UserLayout>
            <div className="p-8 space-y-6">
                {/* ===== SUBJECT HEADER ===== */}
                <div
                    className="relative rounded-xl p-6 flex flex-col gap-2 shadow-md border-l-4"
                    style={{ borderColor: subject.color_code, backgroundColor: "#ffffff" }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-800">{subject.title}</h1>

                            {subject.unit_count !== undefined && (
                                <span
                                    className="text-white text-sm font-semibold px-2 py-1 rounded-full"
                                    style={{ backgroundColor: subject.color_code }}
                                >
                                    {subject.unit_count} Units
                                </span>
                            )}
                        </div>

                        {subject.progress !== undefined && (
                            <span className="text-gray-700 font-medium text-sm">{`Completed ${subject.progress}%`}</span>
                        )}
                    </div>

                    {subject.description && (
                        <p className="text-gray-600 text-sm mt-1">{subject.description}</p>
                    )}
                </div>

                <div className="relative flex justify-center items-start">
                    <div className="absolute left-1/12 top-1/2 -translate-y-1/2 hidden lg:block z-10">
                        <Lottie
                            animationData={characterLeft}
                            loop
                            className="w-80 h-80"
                        />
                    </div>

                    {/* ===== LEARNING PATH ===== */}
                    <div
                        ref={timelineRef}
                        className="relative w-full max-w-md mx-auto py-16"
                    >

                        {/* ===== SVG PATHS ===== */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ zIndex: 0 }}
                        >
                            {positions.map((from, i) => {
                                if (!positions[i + 1]) return null;
                                const to = positions[i + 1];

                                // اتجاه يمين / شمال
                                const direction = i % 2 === 0 ? 1 : -1;

                                const radius = 20;
                                const offsetX = 80 * direction; // مقدار الميل يمين/شمال

                                const d = `
                                M ${from.x} ${from.y}

                                L ${from.x + offsetX - radius * direction} ${from.y}

                                Q ${from.x + offsetX} ${from.y}
                                ${from.x + offsetX} ${from.y + radius}

                                L ${from.x + offsetX} ${to.y - radius}

                                Q ${from.x + offsetX} ${to.y}
                                ${from.x + offsetX - radius * direction} ${to.y}

                                L ${to.x} ${to.y}
                            `;

                                return (
                                    <path
                                        key={i}
                                        d={d}
                                        fill="none"
                                        stroke="#CBD5E1"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                );
                            })}
                        </svg>

                        {/* TIMELINE NODES */}
                        <div className="relative flex flex-col gap-24">
                            {timeline.map((item, index) => {
                                const side = item.type === "unit" ? "center" : index % 2 === 0 ? "left" : "right";

                                return (
                                    <div
                                        key={item.slug}
                                        ref={(el) => (nodeRefs.current[index] = el)}
                                        className="relative"
                                    >
                                        <LessonNode
                                            title={item.title}
                                            side={side}
                                            status={item.status}
                                            type={item.type}
                                            progress={item.progress}
                                            slug={item.slug}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="absolute right-2/5 -bottom-16 translate-y-1/4">
                        <Lottie
                            animationData={characterRight}
                            loop
                            className="w-56 h-56"
                        />
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
