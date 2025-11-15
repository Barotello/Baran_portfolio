import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/data/projects";
import { showError } from "@/utils/toast";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        showError("Error fetching projects: " + error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <section className="w-full text-center mb-12">
          <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            All My Projects
          </h1>
          <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl mx-auto mt-4">
            A collection of my work, showcasing various design and development challenges.
          </p>
        </section>

        <section className="w-full py-8">
          {loading ? (
            <p className="text-center">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No projects to display yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  imageSrc={project.image_src}
                  imageAlt={project.image_alt}
                  title={project.title}
                  tags={project.tags}
                  description={project.description}
                  slug={project.slug}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default ProjectsPage;