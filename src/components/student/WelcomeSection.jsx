// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import welcomeLottie from "../../assets/characters/BigRabbit.json";
import background from "../../assets/images/background.jpeg"

export default function WelcomeSection({ name }) {
    return (
        <div
            className="w-full h-60 rounded-2xl p-6 flex items-center justify-between bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            {/* Left: Welcome Text */}
            <motion.div
                className="flex flex-col gap-2"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
            >
                <h1 className="text-4xl font-bold">
                    Welcome, {name}
                </h1>
                <p className="text-lg text-gray-500">Ready to learn and have fun today?</p>
            </motion.div>

            {/* Right: Lottie Animation */}
            <motion.div
                className="w-48 h-48"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
            >
                <Lottie animationData={welcomeLottie} loop />
            </motion.div>
        </div>
    );
}
