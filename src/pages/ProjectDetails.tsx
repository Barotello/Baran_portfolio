import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Github, Globe, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/data/projects";
import { showError } from "@/utils/toast";
import { cn } from "@/lib/utils"; // cn utility'yi import ediyoruz

// Teknoloji etiketleri için renk sınıfları paleti
const tagColorClasses = [
  { bg: "bg-blue-500/20", text: "text-blue-500", border: "border-blue-500/50" },
  { bg: "bg-green-500/20", text: "text-green-500", border: "border-green-500/50" },
  { bg: "bg-purple-500/20", text: "text-purple-500", border: "border-purple-500/50" },
  { bg: "bg-indigo-500/20", text: "text-indigo-500", border: "border-indigo-500/50" },
  { bg: "bg-pink-500/20", text: "text-pink-500", border: "border-pink-500/50" },
  { bg: "bg-yellow-500/20", text: "text-yellow-500", border: "border-yellow-500/50" },
];

const ProjectDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        showError("Error fetching project details: " + error.message);
        setProject(null);
      } else {
        setProject(data);
        if (data?.next_project_slug) {
          const { data: nextProjectData, error: nextProjectError } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', data.next_project_slug)
            .single();
          if (nextProjectError) {
            console.error("Error fetching next project: ", nextProjectError.message);
            setNextProject(null);
          } else {
            setNextProject(nextProjectData);
          }
        } else {
          setNextProject(null);
        }
      }
      setLoading(false);
    };

    fetchProjectDetails();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading project details...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Project not found!</p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </Link>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <section className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <h2 className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl">
            {project.description}
          </h2>
        </section>

        <section className="w-full py-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-glass-border-light/50 dark:border-glass-border-dark/50 shadow-2xl">
            <img
              alt={project.image_alt}
              className="h-full w-full object-cover"
              src={project.image_src}
            />
            <div className="absolute bottom-4 right-4 flex gap-3">
              {project.live_website_link && (
                <a
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                  href={project.live_website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Website"
                >
                  <Globe className="h-6 w-6" />
                </a>
              )}
              {project.github_repo_link && (
                <a
                  className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40"
                  href={project.github_repo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                >
                  <Github className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 py-12">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Project Overview</h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                {project.overview}
              </p>
            </div>
            {/* Problem ve Solution bölümlerini alt alta gelecek şekilde düzenledik */}
            <div className="flex flex-col gap-8"> 
              <div className="flex flex-col gap-4 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-6 backdrop-blur-xl">
                <h4 className="text-xl font-bold tracking-tight">The Problem</h4>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="flex flex-col gap-4 rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-6 backdrop-blur-xl">
                <h4 className="text-xl font-bold tracking-tight">The Solution</h4>
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
          <aside className="lg:col-span-1 flex flex-col gap-8 lg:mt-12">
            <div className="rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-6 backdrop-blur-xl">
              <h4 className="text-xl font-bold tracking-tight mb-4">My Role</h4>
              <ul className="flex flex-col gap-2 text-stone-600 dark:text-stone-300 text-sm">
                {project.role?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-6 backdrop-blur-xl">
              <h4 className="text-xl font-bold tracking-tight mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, i) => {
                  const colorSet = tagColorClasses[i % tagColorClasses.length];
                  return (
                    <span
                      key={i}
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-medium",
                        colorSet.border,
                        colorSet.bg,
                        colorSet.text
                      )}
                    >
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </aside>
        </section>

        {nextProject && (
          <section className="w-full py-16 lg:py-24">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Next Project</h2>
            </div>
            <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl">
              <img
                alt={nextProject.image_alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={nextProject.image_src}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white md:text-3xl">{nextProject.title}</h3>
                <p className="text-base text-stone-200">{nextProject.tags}</p>
                <Link to={`/projects/${nextProject.slug}`} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-stone-200">
                  View Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </Layout>
  );
};

export default ProjectDetails;