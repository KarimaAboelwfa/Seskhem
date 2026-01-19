import { useState } from "react";
import { registerStudent } from "../../api/auth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../utiles/validators/registerValidation";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, AcademicCapIcon, PhoneIcon } from "@heroicons/react/24/solid";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        gander: "",
        date_of_birth: "",
        school: "",
        father_phone: "",
        mother_phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);

        try {
            const res = await registerStudent(form);
            // console.log("REGISTER SUCCESS:", res.data);

            localStorage.setItem("access", res.data.tokens.access);
            localStorage.setItem("refresh", res.data.tokens.refresh);

            toast.success("Registration Successful");
            navigate("/profile-setup");

        } catch (err) {
            console.log("ERROR FULL:", err);
            // console.log("ERROR RESPONSE:", err.response);
            // console.log("ERROR DATA:", err.response?.data);

            toast.error(
                err.response?.data?.message || "Registration failed"
            );
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto py-12 px-6 bg-white/25 backdrop-blur-md rounded-3xl shadow-lg"
        >
            <h2 className="mb-10 text-center"><p className="text-3xl font-semibold">SIGN UP</p>Start your journey to knowledge</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Row 1: Email + Password */}
                <div className="flex gap-4">
                    <motion.div
                        className="w-1/2 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                        <input
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.email ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </motion.div>

                    <motion.div
                        className="w-1/2 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.password ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-500"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                                <EyeIcon className="w-5 h-5" />
                            )}
                        </button>
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </motion.div>
                </div>

                {/* Row 2: Father Phone + Mother Phone */}
                <div className="flex gap-4">
                    <motion.div
                        className="w-1/2 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <PhoneIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                        <input
                            name="father_phone"
                            placeholder="Father Phone"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.father_phone ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        {errors.father_phone && <p className="text-red-500 text-sm">{errors.father_phone}</p>}
                    </motion.div>

                    <motion.div
                        className="w-1/2 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <PhoneIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                        <input
                            name="mother_phone"
                            placeholder="Mother Phone"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.mother_phone ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        {errors.mother_phone && <p className="text-red-500 text-sm">{errors.mother_phone}</p>}
                    </motion.div>
                </div>

                {/* Row 4: School + Date of Birth */}
                <div className="flex gap-4">
                    <motion.div
                        className="w-1/2 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <AcademicCapIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                        <input
                            name="school"
                            placeholder="School"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.school ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}
                    </motion.div>

                    <motion.div
                        className="w-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <input
                            name="date_of_birth"
                            type="date"
                            onChange={handleChange}
                            className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                                ${errors.date_of_birth ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}
                                `}
                        />
                        {errors.date_of_birth && <p className="text-red-500 text-sm">{errors.date_of_birth}</p>}
                    </motion.div>
                </div>

                {/* Row 4: Gender */}
                <div>
                    <motion.div
                        className="w-1/2 flex space-x-6 items-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="gander" value="Male" onChange={handleChange} className="accent-indigo-500 w-5 h-5" />
                            <span className="text-gray-700">Male</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" name="gander" value="Female" onChange={handleChange} className="accent-indigo-500 w-5 h-5" />
                            <span className="text-gray-700">Female</span>
                        </label>
                    </motion.div>
                    {errors.gander && <p className="text-red-500 text-sm">{errors.gander}</p>}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-semibold shadow-md transition-colors
                        ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"}
                        `}                >
                    {loading ? "Loading..." : "SIGN UP"}
                </motion.button>
            </form>

            <p className="mt-4 text-center text-gray-600">
                Already have an account?{" "}
                <span
                    onClick={() => navigate("/login")}
                    className="text-indigo-500 font-semibold hover:underline cursor-pointer"
                >
                    SIGN IN
                </span>
            </p>

        </motion.div>
    );
}
