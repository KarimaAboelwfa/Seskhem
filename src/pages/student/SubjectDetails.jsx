import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjectDetails } from "../../api/student";
import UserLayout from "../../components/layouts/UserLayout";
import UnitsList from "../../components/student/UnitsList";

export default function SubjectDetails() {
    const { subjectSlug } = useParams();

    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSubjectDetails(subjectSlug)
            .then(res => setSubject(res.data))
            .finally(() => setLoading(false));
    }, [subjectSlug]);

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
                <h1 className="text-3xl font-bold">{subject.title}</h1>
                <p className="text-gray-600">{subject.description}</p>

                <UnitsList />
            </div>
        </UserLayout>
    );
}
