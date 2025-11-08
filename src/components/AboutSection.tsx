import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AboutSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24" id="about">
      <div className="flex flex-col items-center gap-8 text-center">
        {/* Yuvarlak profil resmi buradan kaldırıldı */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">About Me</h2>
        <p className="max-w-xl text-lg text-stone-600 dark:text-stone-300">
          I'm a passionate product designer and developer with a knack for
          turning complex problems into beautiful, intuitive, and functional digital solutions.
          My goal is to create impactful experiences that resonate with users.
        </p>
        <Link to="/about" className="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-11 px-6 text-base font-bold text-primary hover:text-primary/80">
          <span className="truncate">Learn More About Me</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default AboutSection;