// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { StarIcon, BoltIcon, ClockIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default function Gamification({ points, level, streakDays, badges }) {
    const cards = [
        { label: "Points", value: points, icon: <BoltIcon className="w-8 h-8 text-yellow-400" />, color: "from-yellow-300 to-yellow-500" },
        { label: "Level", value: level, icon: <StarIcon className="w-8 h-8 text-indigo-400" />, color: "from-indigo-300 to-indigo-500" },
        { label: "Streak Days", value: streakDays, icon: <ClockIcon className="w-8 h-8 text-pink-400" />, color: "from-pink-300 to-pink-500" },
        { label: "Badges", value: badges, icon: <CheckBadgeIcon className="w-8 h-8 text-green-400" />, color: "from-green-300 to-green-500" },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cards.map((card, i) => (
                <motion.div
                    key={card.label}
                    className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2, type: "spring", stiffness: 120 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                >
                    <div className={`p-3 rounded-full ${card.color} bg-opacity-20`}>
                        {card.icon}
                    </div>
                    <p className="text-lg font-bold text-gray-800">{card.value}</p>
                    <p className="text-gray-500 text-sm">{card.label}</p>
                </motion.div>
            ))}
        </div>
    );
}
