// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import bgGame from "../../assets/images/bg-game.jpeg";
import bgQuiz from "../../assets/images/bg-quiz.jpeg";
import bgTrophy from "../../assets/images/bg-trophy.jpeg";
import bgVoice from "../../assets/images/bg-voice.jpeg";

const activities = [
    { title: "Educational Games", text: "Fun games that teach concepts while kids play.", bg: bgGame },
    { title: "Voice Interaction", text: "Talk with AI and get instant feedback.", bg: bgVoice },
    { title: "Quizzes & Challenges", text: "Interactive quizzes to test and improve knowledge.", bg: bgQuiz },
    { title: "Rewards & Stars", text: "Collect stars, badges, and achievements for motivation.", bg: bgTrophy }
];

export default function InteractiveLearning() {
    return (
        <section className="py-24 bg-white px-6">
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="text-4xl font-bold text-primary mb-6"
                >
                    Interactive Learning
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className="text-lg text-gray-700 max-w-3xl mx-auto mb-16"
                >
                    At SESKHEM, learning is never boring! Children interact, play, and grow smarter through engaging activities powered by AI.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activities.map((act, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover="hover"
                            viewport={{ once: false }}
                            className="relative rounded-2xl overflow-hidden h-64"
                        >
                            <motion.div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${act.bg})` }}
                                variants={{
                                    hover: { scale: 1.1 }
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className="absolute inset-0 bg-black/70"></div>
                            </motion.div>

                            <div className="relative z-10 p-6 flex flex-col justify-end h-full text-center text-white">
                                <h3 className="text-xl font-bold mb-2">{act.title}</h3>
                                <p className="text-sm leading-relaxed">{act.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
