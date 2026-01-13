// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTA() {
    const navigate = useNavigate();

    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="py-24 px-6 rounded-t-3xl bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 text-white text-center shadow-xl"
        >
            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold mb-4 leading-snug drop-shadow-lg"
            >
                Start Your Learning Journey Today
            </motion.h2>

            <motion.p
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl max-w-3xl mx-auto mb-10 drop-shadow-md"
            >
                Join SESKHEM and discover a fun, safe, and interactive way to learn with AI!
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="bg-white text-indigo-500 px-10 py-4 md:px-12 md:py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all cursor-pointer"
            >
                Register Now
            </motion.button>
        </motion.section>
    );
}

