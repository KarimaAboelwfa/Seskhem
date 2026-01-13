import Benefits from "../components/home/Benefits";
import CTA from "../components/home/CTA";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import InteractiveLearning from "../components/home/InteractiveLearning";

export default function Home() {
    return (
        <>
            <Hero />
            <HowItWorks />
            <InteractiveLearning />
            <Benefits />
            <CTA />
        </>
    );
}
