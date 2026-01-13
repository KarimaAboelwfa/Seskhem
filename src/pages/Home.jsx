import Benefits from "../components/home/Benefits";
import BlogPreview from "../components/home/BlogPreview";
import CTA from "../components/home/CTA";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import InteractiveLearning from "../components/home/InteractiveLearning";
import Pricing from "../components/home/Pricing";
import Testimonials from "../components/home/Testimonials";
import homeBg from "../assets/images/home.jpeg";

export default function Home() {
    return (
        <div
            className="relative min-h-screen flex flex-col justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url(${homeBg})` }}
        >
            <div className="relative z-10">
                <Hero />
                <HowItWorks />
                <InteractiveLearning />
                <Benefits />
                <Pricing />
                <Testimonials />
                <BlogPreview />
                <CTA />
            </div>
        </div>
    );
}
