import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUnits } from "../../api/student";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import unitLottie from "../../assets/characters/Strawberry.json";
import UnitsSkeleton from "../skeletons/UnitsSkeleton";
import UserLayout from "../layouts/UserLayout";

const gradients = [
  "from-pink-300 via-purple-300 to-indigo-400",
  "from-yellow-300 via-green-300 to-teal-400",
  "from-orange-300 via-red-300 to-pink-400",
  "from-blue-300 via-indigo-300 to-purple-400",
  "from-green-300 via-teal-300 to-lime-400",
];

export default function UnitsList() {
  const { subjectSlug } = useParams();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await getUnits(subjectSlug);
        // console.log(res.data)
        setUnits(res.data || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load units");
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [subjectSlug]);

  if (loading) return <UnitsSkeleton />

  if (units.length === 0)
    return (
      <div className="text-center py-20">
        <Lottie
          animationData={unitLottie}
          loop
          className="w-32 h-32 mx-auto mb-4"
        />
        <p className="text-xl font-bold text-gray-600">
          No units available!
        </p>
        <p className="text-gray-400 mt-2">
          Check back later or explore other subjects.
        </p>
      </div>
    );

  return (
    <UserLayout>
      <div className="p-6 space-y-6">
        {units.map((unit, index) => {
          const gradient = gradients[index % gradients.length];

          return (

            <motion.div
              key={unit.slug}
              onClick={() => navigate(`/lessons/${unit.slug}`)}
              className={`bg-gradient-to-r ${gradient} p-6 rounded-3xl shadow-2xl flex items-center gap-4 cursor-pointer`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 120,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Lottie Animation */}
              <div className="w-20 h-20 flex-shrink-0">
                <Lottie animationData={unitLottie} loop />
              </div>

              {/* Unit Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">{unit.title}</h3>
                <p className="text-white/90 mt-1 font-semibold">{unit.subject_title}</p>
                <p className="text-white/80 mt-1">{unit.description}</p>
                <p className="text-white/70 mt-1 text-sm">Unit #{unit.order}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </UserLayout>
  );
}
