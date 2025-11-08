import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/data/projects";
import { showError } from "@/utils/toast";
import { Link } from "react-router-dom"; // Link bileşenini import ediyoruz

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4); // Sadece ilk 4 projeyi göster

      if (error) {
        showError("Error fetching projects: " + error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24" id="projects">
        <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Projects</h2>
          <p className="text-center">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="w-full py-16 lg:py-24" id="projects">
        <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Projects</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">No projects to display yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 lg:py-24" id="projects">
      <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Projects</h2>
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
        <div className="mt-12 text-center">
          <Link to="/projects" className="flex h-11 min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-base font-bold text-white transition hover:opacity-90">
            <span className="truncate">View All Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;