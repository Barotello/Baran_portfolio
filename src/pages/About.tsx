import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const About: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <section className="w-full" id="about-me">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            <div className="sticky top-32 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <img
                className="aspect-square w-48 rounded-full object-cover shadow-lg lg:w-full lg:rounded-2xl"
                alt="Professional headshot of Baran Demirtaş, smiling warmly."
                src="/images/profile-placeholder.jpg" /* Yerel görsel yolu */
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">Baran Demirtaş</h1>
                <h2 className="text-xl font-display font-medium text-stone-600 dark:text-stone-300">
                  Product Designer &amp; Developer
                </h2>
              </div>
              <p className="text-stone-600 dark:text-stone-400">
                I'm a passionate product designer and developer with a knack for
                turning complex problems into beautiful, intuitive, and
                functional digital solutions.
              </p>
              <a
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-white transition hover:opacity-90 sm:w-auto"
                href="#"
              >
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </div>
            <div className="flex flex-col gap-12 lg:col-span-2">
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Experience</h3>
                <div className="flex flex-col gap-8">
                  <div className="flex gap-6">
                    <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold">Senior Product Designer</h4>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          2020 - Present
                        </span>
                      </div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        Innovate Inc.
                      </p>
                      <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Leading design for flagship products, mentoring junior
                        designers, and collaborating with cross-functional teams
                        to deliver user-centered solutions.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className="font-bold">UX/UI Designer</h4>
                        <span className="text-sm text-stone-500 dark:text-stone-400">
                          2018 - 2020
                        </span>
                      </div>
                      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                        Tech Solutions Co.
                      </p>
                      <p className="mt-2 text-stone-600 dark:text-stone-400">
                        Designed and prototyped interfaces for web and mobile
                        applications, conducted user research, and contributed
                        to a major redesign of the company's SaaS platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="text-2xl font-bold">Education</h3>
                <div className="flex gap-6">
                  <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold">B.S. in Computer Science</h4>
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        2014 - 2018
                      </span>
                    </div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-300">
                      University of Technology
                    </p>
                    <p className="mt-2 text-stone-600 dark:text-stone-400">
                      Focused on Human-Computer Interaction and software
                      development. Graduated with honors.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                <h3 className="mb-6 text-2xl font-bold">Skills</h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-4 text-lg font-semibold">
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Figma
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        React
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        JavaScript
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Next.js
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Node.js
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Tailwind CSS
                      </span>
                      <span className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                        Prototyping
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 text-lg font-semibold">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Communication
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Teamwork
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Problem Solving
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Empathy
                      </span>
                      <span className="rounded-full border border-stone-400/50 bg-stone-500/20 px-3 py-1 text-sm font-medium text-stone-800 dark:text-stone-200">
                        Adaptability
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default About;