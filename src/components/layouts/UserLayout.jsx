import { useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import Lottie from "lottie-react";
import Alien_Reading from "../../assets/characters/Alien_Reading.json";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { PencilIcon } from '@heroicons/react/24/solid';

import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/student";

export default function UserLayout({ children }) {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await getStudentDashboard();
                setDashboard(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchDashboard();
    }, []);

    const gamification = {
        current_level: dashboard?.gamification?.current_level ?? 0,
    };
    const average_score = dashboard?.average_score ?? 0;

    return (
        <>
            <header className="fixed top-0 left-0 w-full bg-white shadow-lg px-4 py-2 flex items-center justify-between z-50">

                {/* Logo & Animated Name */}
                <div className="flex items-center gap-2">
                    <div className="w-14 h-14">
                        <Lottie animationData={Alien_Reading} loop={true} />
                    </div>
                    <span className="text-2xl font-extrabold text-indigo-500">
                        <Typewriter
                            words={['SESKHEM']}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={120}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    </span>
                </div>

                {/* Progress & Button */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Level {gamification.current_level}</span>
                        <div className="w-36 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <motion.div
                                className="bg-indigo-500 h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${average_score}%` }}
                                transition={{ duration: 1.2, ease: "easeInOut" }}
                            />
                        </div>
                        <span className="text-sm text-gray-500">{average_score.toFixed()}%</span>
                    </div>

                    <motion.button
                        onClick={() => navigate("/profile-setup")}
                        className="bg-indigo-500 text-white px-2 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
                        whileHover={{ scale: 1.05, backgroundColor: "#5c6ac4" }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <PencilIcon className="w-5 h-5" />
                        <span className="hidden md:block">Edit Grade/Term</span>
                    </motion.button>

                </div>
            </header>

            <div className="mt-16">
                {children}
            </div>
        </>
    );
}
