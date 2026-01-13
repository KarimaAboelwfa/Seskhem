// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import robotLottie from "../../assets/characters/Alien_Reading.json";
import aiImage from "../../assets/images/robot-icon.png";
import brainImage from "../../assets/images/brain.png";
import chatImage from "../../assets/images/chat.png";
import starImage from "../../assets/images/star.png";

const steps = [
    {
        id: 1,
        img: aiImage,
        title: "AI-Powered Explanations",
        text: "Our AI explains lessons in a simple and friendly way that kids can easily understand."
    },
    {
        id: 2,
        img: brainImage,
        title: "Smart Understanding",
        text: "The AI understands each child’s level and adjusts the content to match their learning pace."
    },
    {
        id: 3,
        img: chatImage,
        title: "Ask & Interact",
        text: "Kids can ask questions anytime and get instant, helpful answers."
    },
    {
        id: 4,
        img: starImage,
        title: "Personalized Learning",
        text: "Every child gets a unique learning experience based on their progress and interaction."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-28 px-6">
            <div className="max-w-7xl mx-auto text-center">

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="text-4xl font-bold text-primary mb-20 lg:mb-0"
                >
                    How Does SESKHEM Use AI
                </motion.h2>

                {/* Timeline */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                    {/* Left */}
                    <div className="space-y-24">
                        {[steps[0], steps[1]].map((step) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                className="text-left"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <img src={step.img} alt={step.title} className="w-20 h-20" />
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 max-w-md">
                                    {step.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Center */}
                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: false }}
                            className="relative z-10 bg-white shadow-xl rounded-3xl p-10 lg:mt-40"
                        >
                            <Lottie
                                animationData={robotLottie}
                                loop
                                className="w-52 h-52 mx-auto"
                            />

                            <h3 className="text-xl font-bold text-primary mt-4">
                                Interactive Learning Flow
                            </h3>

                            <p className="text-gray-600 max-w-xs mx-auto">
                                A joyful AI-guided learning journey made just for kids.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right */}
                    <div className="space-y-24 text-right">
                        {[steps[2], steps[3]].map((step) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                            >
                                <div className="flex items-center justify-end gap-4 mb-3">
                                    <img src={step.img} alt={step.title} className="w-20 h-20" />
                                </div>

                                <h3 className="text-xl font-bold text-primary mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 max-w-md ml-auto">
                                    {step.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
