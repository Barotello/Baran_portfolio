import React from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects"; // Import projects from the new data file

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24" id="projects">
      <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Selected Work</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug} // Use slug as key
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            title={project.title}
            tags={project.tags}
            description={project.description}
            slug={project.slug} // Pass slug to ProjectCard
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;