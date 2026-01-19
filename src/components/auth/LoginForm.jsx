import { useState } from "react";
import { loginStudent } from "../../api/auth";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../utiles/validators/loginValidation";
import { getEnrollmentStatus } from "../../api/student";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginSuccess = async () => {
        try {
            const res = await getEnrollmentStatus();

            if (res.data.is_setup_complete) {
                navigate("/dashboard");
            } else {
                navigate("/profile-setup");
            }

        } catch (error) {
            console.error("Enrollment status error", error);
        }
    };


    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        const validationErrors = validateLogin(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);

        try {
            const res = await loginStudent(form);
            // console.log("LOGIN SUCCESS:", res.data);

            const tokens = res.data.data.tokens;

            localStorage.setItem("access", tokens.access);
            localStorage.setItem("refresh", tokens.refresh);

            toast.success("Login Successful ");
            await handleLoginSuccess();

        } catch (err) {
            console.log("LOGIN ERROR FULL:", err);
            // console.log("LOGIN ERROR RESPONSE:", err.response);
            // console.log("LOGIN ERROR DATA:", err.response?.data);

            toast.error(
                err.response?.data?.message || "Invalid email or password"
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
            className="max-w-md p-16 bg-white/25 backdrop-blur-md rounded-3xl shadow-lg"
        >
            <h2 className="mb-10 text-center"><p className="text-3xl font-semibold">SIGN IN</p>Continue your journey to knowledge</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative"
                >
                    <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute right-0 top-1/2 -translate-y-1/2" />
                    <input
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className={`w-full border-b-2 focus:outline-none py-2 placeholder-gray-400 transition-colors
                            ${errors.email ? "border-red-500" : "border-gray-300 focus:border-indigo-500"}`
                        } />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </motion.div>

                {/* Password Field */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative"
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

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </motion.div>

                {/* Login Button */}
                <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    disabled={loading}
                    className={`w-full py-2 rounded-xl font-semibold shadow-md transition-colors
                        ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer"}
                        `}
                >
                    {loading ? "Loading..." : "SIGN IN"}
                </motion.button>
            </form>

            <p className="mt-4 text-center text-gray-600">
                Don't have an account?{" "}
                <span
                    onClick={() => navigate("/register")}
                    className="text-indigo-500 font-semibold hover:underline cursor-pointer"
                >
                    SIGN UP
                </span>

            </p>
        </motion.div>
    );
}