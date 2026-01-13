// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ballon from "../../assets/images/balloon.png"
import plane from "../../assets/images/Plane.png"
import rocket from "../../assets/images/rocket.png"
import { CheckCircleIcon, StarIcon } from "@heroicons/react/24/solid";

const plans = [
    {
        title: "Starter",
        subtitle: "Perfect to begin",
        price: "$15 / month",
        image: ballon,
        color: {
            border: "border-sky-400",
            text: "text-sky-500",
            button: "bg-sky-400 hover:bg-sky-500",
        },
        features: [
            "1 Child Account",
            "Fun basic lessons",
            "AI explanations (limited)",
        ],
    },
    {
        title: "Premium",
        subtitle: "Best for growing minds",
        price: "$30 / month",
        image: plane,
        popular: true,
        color: {
            border: "border-indigo-500",
            text: "text-indigo-600",
            button: "bg-indigo-500 hover:bg-indigo-600",
        },
        features: [
            "Up to 2 Child Accounts",
            "Full interactive lessons",
            "Games, quizzes & rewards",
        ],
    },
    {
        title: "Ultimate",
        subtitle: "For learning without limits",
        price: "$50 / month",
        image: rocket,
        color: {
            border: "border-purple-600",
            text: "text-purple-600",
            button: "bg-purple-600 hover:bg-purple-700",
        },
        features: [
            "Up to 4 Child Accounts",
            "Unlimited AI learning",
            "Parent progress reports",
        ],
    },
];

export default function Pricing() {
    return (
        <section className="py-24 px-6">
            <motion.div
                className="max-w-6xl mx-auto px-4 text-center bg-white/70 rounded-3xl p-10"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
            >
                {/* Section Title */}
                <h2 className="text-4xl md:text-5xl font-extrabold text-center drop-shadow-lg mb-4">
                    Choose the Right Plan for Your Child
                </h2>
                <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
                    Simple, safe, and fun learning plans designed especially for kids and
                    families.
                </p>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.15 }}
                            className={`relative bg-white rounded-[32px] border-2 ${plan.color.border} p-8 shadow-sm hover:shadow-lg transition`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <span className="flex items-center gap-2 absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                    <StarIcon className="w-6 h-6 text-yellow-400" /> Most Popular
                                </span>
                            )}

                            {/* Image */}
                            <img
                                src={plan.image}
                                alt={plan.title}
                                className="w-32 h-32 mx-auto mb-6"
                            />

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-800">
                                {plan.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                {plan.subtitle}
                            </p>

                            {/* Features */}
                            <ul className="space-y-3 text-gray-600 text-sm mb-6 text-left">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Price */}
                            <p className={`text-3xl font-extrabold ${plan.color.text} mb-6`}>
                                {plan.price}
                            </p>

                            {/* Button */}
                            <button
                                className={`w-full py-3 rounded-full text-white font-bold transition ${plan.color.button}`}
                            >
                                Start Learning
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
