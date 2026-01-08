// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import background from "../../assets/images/background.jpeg";

import Lottie from "lottie-react";
import character1 from "../../assets/characters/bird.json";
import welcome from "../../assets/characters/Welcome.json";

export default function AuthLayout({ children }) {

    return (
        <div className="relative min-h-screen">

            {/* Main container */}
            <div className="relative z-10 flex min-h-screen w-full justify-center items-center">

                {/* Content wrapper */}
                <div className="flex w-full lg:max-w-4xl min-h-screen lg:min-h-0 rounded-none lg:rounded-3xl shadow-none lg:shadow-xl p-6 lg:p-8 bg-cover bg-center"
                    style={{ backgroundImage: `url(${background})` }}
                >

                    {/* Form */}
                    <div className="w-full lg:w-1/2 flex justify-center items-center">
                        <div className="w-full max-w-md">
                            {children}
                        </div>
                    </div>

                    {/* Characters */}
                    <div className="w-1/2 hidden lg:flex flex-col justify-center items-center space-x-2">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-3xs h-36"
                        >
                            <Lottie animationData={welcome} loop={true} />
                        </motion.div>

                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-3xs h-36 -mt-5 mb-5"
                        >
                            <Lottie animationData={character1} loop={true} />
                        </motion.div>
                    </div>

                </div>
            </div>

        </div>
    );
}
