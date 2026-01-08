import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
    setupProfile,
    getAcademicYears,
    getEducationalStructure,
    getTerms,
} from "../../api/student";
import { validateProfileSetup } from "../../utiles/validators/profileSetupValidation";
import { getEnrollmentStatus } from "../../api/student";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function ProfileSetupForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        academic_year_slug: "",
        grade_slug: "",
        term_slug: "",
        school: "",
    });

    const [years, setYears] = useState([]);
    const [grades, setGrades] = useState([]);
    const [terms, setTerms] = useState([]);

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // console.log("Access token:", localStorage.getItem("access"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const validationErrors = validateProfileSetup(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);

        // console.log("Data being sent to API:", form);

        try {
            await setupProfile(form);
            toast.success("Profile completed successfully");
            navigate("/dashboard");
        } catch (err) {
            console.log(err.response?.status);
            console.log(err.response?.data);
            toast.error("Profile setup failed");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // جلب البيانات الثابتة للفورم
                const [yearsRes, structureRes, termsRes, enrollmentRes] = await Promise.all([
                    getAcademicYears(),
                    getEducationalStructure(),
                    getTerms(),
                    getEnrollmentStatus(),
                ]);

                setYears(yearsRes.data);
                setTerms(termsRes.data);

                const allGrades = structureRes.data.data.flatMap(
                    (level) => level.grades
                );
                setGrades(allGrades);

                // تعبئة الفورم بالقيم القديمة لو موجودة
                if (enrollmentRes.data.status && enrollmentRes.data.current_setup) {
                    const setup = enrollmentRes.data.current_setup;
                    setForm({
                        academic_year_slug: setup.academic_year || "",
                        grade_slug: setup.grade || "",
                        term_slug: setup.term || "",
                        school: setup.school || "",
                    });
                }

            } catch (error) {
                console.error(error);
                toast.error("Failed to load profile data");
            }
        };

        fetchData();
    }, []);



    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-10 pt-24 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-3xl font-bold text-gray-800">
                    Complete Your Profile
                </h2>
                <p className="text-gray-500 mt-2">
                    Just a few details to get started
                </p>
            </motion.div>

            {/* Academic Year */}
            <motion.div>
                <select
                    name="academic_year_slug"
                    value={form.academic_year_slug}
                    onChange={handleChange}
                    className={`w-full border-b-2 py-2 focus:outline-none transition
                        ${errors.academic_year_slug ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`}
                >
                    <option hidden value="">Select Academic Year</option>
                    {years.map((year) => (
                        <option key={year.slug} value={year.slug}>
                            {year.title}
                        </option>
                    ))}
                </select>
                {errors.academic_year_slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.academic_year_slug}</p>
                )}
            </motion.div>

            {/* Grade */}
            <motion.div>
                <select
                    name="grade_slug"
                    value={form.grade_slug}
                    onChange={handleChange}
                    className={`w-full border-b-2 py-2 focus:outline-none transition
                        ${errors.grade_slug ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`}
                >
                    <option hidden value="">Select Grade</option>
                    {grades.map((grade) => (
                        <option key={grade.slug} value={grade.slug}>
                            {grade.title}
                        </option>
                    ))}
                </select>
                {errors.grade_slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade_slug}</p>
                )}
            </motion.div>

            {/* Term */}
            <motion.div>
                <select
                    name="term_slug"
                    value={form.term_slug}
                    onChange={handleChange}
                    className={`w-full border-b-2 py-2 focus:outline-none transition
                        ${errors.term_slug ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`}
                >
                    <option hidden value="">Select Term</option>
                    {terms.map((term) => (
                        <option key={term.slug} value={term.slug}>
                            {term.title}
                        </option>
                    ))}
                </select>
                {errors.term_slug && (
                    <p className="text-red-500 text-sm mt-1">{errors.term_slug}</p>
                )}
            </motion.div>

            {/* School */}
            <motion.div className="relative">
                <AcademicCapIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                <input
                    name="school"
                    value={form.school}
                    placeholder="Type your school name"
                    onChange={handleChange}
                    className={`w-full border-b-2 py-2 focus:outline-none transition
                        ${errors.school ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`}
                />
                {errors.school && (
                    <p className="text-red-500 text-sm mt-1">{errors.school}</p>
                )}
            </motion.div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-xl font-semibold text-lg transition
                    ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"}
                        `}
            >
                {loading ? "Saving..." : "Continue"}
            </button>

            {/* Optional Footer */}
            <p className="text-center text-gray-400 text-sm">
                We respect your privacy. Your data is safe with us.
            </p>
        </motion.form>
    );
}
