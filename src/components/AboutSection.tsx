import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24" id="about">
      <div className="grid grid-cols-1 items-center gap-12 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl md:grid-cols-3 md:p-12">
        <div className="md:col-span-1">
          <img
            className="aspect-square w-full rounded-full object-cover md:rounded-lg"
            alt="Professional headshot of Jane Doe, smiling warmly."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuALXJfMwySBNcfk1gLMZvWPhTCRqEi6AV56yyEcWirFpm638L7oH2yDxA8siy8ydu5lefzGWFa7Xw5Q2nrcffu0AEMNAndAkhuQYgl1NSkb4-lz1ca4zkc6q8sTBSI5WheiChvKdixoC8KwqK238vjs-mlc55uMuFWM-nB_RityyswJWld5D_9gOSIKOyFZvKZ3QsRpvfgDufPIGamI5EE6EqSi5MIJrlWuI0tTOoAVISw_2O2YuoLj8rqAOGXtenfPxtBvYVNVeA"
          />
        </div>
        <div className="flex flex-col gap-6 md:col-span-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">About Me</h2>
            <p className="text-stone-600 dark:text-stone-300">
              I'm a passionate product designer and developer with a knack for turning complex problems into beautiful, intuitive, and functional digital solutions. With over 5 years of experience, I thrive at the intersection of design and technology, ensuring every pixel is perfect and every line of code is efficient.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">Figma</span>
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">React</span>
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">Prototyping</span>
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">UI/UX Design</span>
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">Tailwind CSS</span>
            <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;