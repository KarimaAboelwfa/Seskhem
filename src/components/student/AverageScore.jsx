// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import owl from "../../assets/characters/Owl.json";
import background from "../../assets/images/background.jpeg"

export default function AverageScore({ average_score }) {
    return (
        <motion.div
            className="p-6 rounded-2xl shadow-lg flex items-center justify-between gap-4"
            style={{ backgroundImage: `url(${background})` }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05 }}
        >
            {/* Left: Lottie */}
            <div className="w-16 h-16">
                <Lottie animationData={owl} loop />
            </div>

            {/* Right: Score */}
            <div className="flex">
                <p className="text-3xl font-extrabold">
                    <span className="text-lg font-bold mr-3">Average Score:</span>
                    {average_score}%
                </p>
            </div>
        </motion.div>
    );
}
