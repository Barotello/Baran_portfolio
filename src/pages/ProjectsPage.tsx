import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const ProjectsPage: React.FC = () => {
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                imageSrc={project.imageSrc}
                imageAlt={project.imageAlt}
                title={project.title}
                tags={project.tags}
                description={project.description}
                slug={project.slug}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default ProjectsPage;