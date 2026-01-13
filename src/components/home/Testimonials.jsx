// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { RiStarFill } from "react-icons/ri";

const testimonials = [
    {
        name: "Sarah M.",
        text: "My child is excited to learn every day thanks to SESKHEM!",
    },
    {
        name: "Ahmed K.",
        text: "The AI tutor explains lessons better than any app we tried.",
    },
    {
        name: "Lina A.",
        text: "Safe, fun, and very interactive. Highly recommended!",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6">
            <motion.div
                className="max-w-5xl mx-auto text-center bg-white/70 rounded-3xl p-10"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-lg">
                    What Parents Say
                </h2>

                <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between w-full md:w-80 hover:scale-105 transition-transform duration-300 cursor-pointer"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                        >
                            <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
                                “{t.text}”
                            </p>
                            <div>
                                <h4 className="font-bold text-indigo-600 text-lg md:text-xl">
                                    {t.name}
                                </h4>
                                <div className="flex justify-center mt-2 gap-1 text-yellow-400">
                                    {[...Array(5)].map((_, index) => (
                                        <RiStarFill key={index} className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
