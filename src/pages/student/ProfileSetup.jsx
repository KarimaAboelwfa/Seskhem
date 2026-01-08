import background from "../../assets/images/background.jpeg";
import Strawberry from "../../assets/characters/Strawberry.json";
import Lottie from "lottie-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ProfileSetupForm from "../../components/student/ProfileSetupForm";
import { Toaster } from "react-hot-toast";

export default function ProfileSetup() {
    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                }}
            />

            <div className="relative w-full max-w-md">
                <motion.div
                    className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-36 h-36"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.5 }}
                >
                    <Lottie animationData={Strawberry} loop={true} />
                </motion.div>

                <ProfileSetupForm />

            </div>
        </div >
    );
}
