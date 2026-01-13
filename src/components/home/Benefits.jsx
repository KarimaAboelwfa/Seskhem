// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { GiPartyPopper, GiBrain, GiShield, GiMagicPalm, GiGrowth } from "react-icons/gi";

const benefits = [
    { icon: <GiPartyPopper className="w-10 h-10 text-white" />, text: "Fun and engaging learning for kids", bg: "bg-pink-400" },
    { icon: <GiBrain className="w-10 h-10 text-white" />, text: "Powered by Artificial Intelligence", bg: "bg-indigo-400" },
    { icon: <GiShield className="w-10 h-10 text-white" />, text: "Safe and trusted content", bg: "bg-green-400" },
    { icon: <GiMagicPalm className="w-10 h-10 text-white" />, text: "Personalized learning experience", bg: "bg-yellow-400" },
    { icon: <GiGrowth className="w-10 h-10 text-white" />, text: "Helps children grow at their own pace", bg: "bg-blue-400" }
];

export default function Benefits() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto text-center bg-white/70 rounded-3xl p-10">

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-6 drop-shadow-lg"
                >
                    Why Choose SESKHEM
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: false }}
                    className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto"
                >
                    SESKHEM combines learning, fun, and artificial intelligence to give children a unique, safe, and interactive educational experience.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: false }}
                            className={`flex items-center gap-4 p-5 rounded-2xl shadow-lg hover:shadow-xl transition ${benefit.bg}`}
                        >
                            <div className="flex-shrink-0">{benefit.icon}</div>
                            <p className="text-white font-semibold text-left">{benefit.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
