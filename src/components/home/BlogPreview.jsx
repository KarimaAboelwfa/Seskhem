// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const blogs = [
    {
        title: "How AI Makes Learning Fun for Kids",
        desc: "Discover how AI adapts to every child’s learning style.",
    },
    {
        title: "Top 5 Educational Games for Children",
        desc: "Learning through play is the future of education.",
    },
    {
        title: "Why Interactive Learning Works Better",
        desc: "Science-backed reasons kids learn faster with interaction.",
    },
];

export default function BlogPreview() {
    return (
        <section className="py-24 px-6">
            <motion.div
                className="max-w-6xl mx-auto bg-white/70 rounded-3xl p-10"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-lg">
                    Learn More from Our Blog
                </h2>

                <div className="grid md:grid-cols-3 gap-8 justify-items-center">
                    {blogs.map((blog, i) => (
                        <motion.div
                            key={i}
                            className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-300 cursor-pointer w-full md:w-80"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                        >
                            <div>
                                {/* Title */}
                                <h3 className="font-bold text-xl md:text-2xl mb-3 text-primary">
                                    {blog.title}
                                </h3>
                                {/* Description */}
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                                    {blog.desc}
                                </p>
                            </div>

                            {/* Button */}
                            <button className="mt-4 self-start bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-2 rounded-full shadow-md transition-colors duration-300">
                                Read More →
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
