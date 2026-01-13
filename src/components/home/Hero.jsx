// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import robot from "../../assets/images/Robot_and_Boy.png";
import { Typewriter } from 'react-simple-typewriter';
import heroBg from "../../assets/images/heroBg.jpeg";

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section
            className="relative min-h-screen flex flex-col justify-center bg-cover"
            style={{ backgroundImage: `url(${heroBg})` }}
            >
            {/* Content */}
            <div className="flex justify-between items-center px-10 lg:px-24">
                <motion.div
                    className="hidden md:block"
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}>
                    <img src={robot} alt="robot" className="relative z-10" />
                </motion.div>
                <div className="relative bg-white/70 p-10 rounded-3xl z-10">
                    {/* Site Name */}
                    <motion.h1
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold mb-4 text-indigo-500"
                    >
                        <Typewriter
                            words={['SESKHEM']}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={120}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-2xl max-w-2xl mb-8"
                    >
                        Interactive educational platform designed especially
                        for kids. It combines learning, games, and artificial intelligence
                        to create a fun and smart learning experience.
                        <br /><br />
                        <span className="text-lg">Children don’t just watch lessons — they interact, ask questions,
                            and learn at their own pace using AI-powered tools.</span>
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-full text-xl font-semibold shadow-sm shadow-indigo-500 hover:scale-105 transition cursor-pointer"
                        >
                            Start Learning
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="border-2 border-indigo-500 px-4 py-2 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-indigo-500 hover:scale-105 transition cursor-pointer"
                        >
                            Login
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
