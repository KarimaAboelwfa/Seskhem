import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import background from "../assets/images/background.jpeg";
import Rabbit from "../assets/characters/rabbit.json";
import Lottie from "lottie-react";

export default function Welcome() {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0"></div>

            <div className="relative z-10 flex w-full max-w-6xl items-center justify-between px-8">

                <motion.div
                    className="hidden lg:flex w-1/2 justify-center"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Lottie animationData={Rabbit} loop={true} className="w-64" />
                </motion.div>

                <motion.div
                    className="w-full lg:w-1/2 text-white text-center mt-20"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Welcome to SESKHEM
                    </h1>
                    <p className="text-xl">Start your journey to knowledge with SESKHEM!</p>
                    <p className="text-xs mb-8">Sign in to personalize your learning experience, access your courses, and achieve your academic goals faster.</p>
                    <motion.button
                        onClick={goToLogin}
                        className="bg-indigo-500 text-white font-semibold py-2 px-10 rounded-xl shadow-lg hover:bg-indigo-600 transition cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Go to Login
                    </motion.button>
                </motion.div>

            </div>
        </div>
    );
}
