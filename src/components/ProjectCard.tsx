import React from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string;
  slug: string; // Changed from caseStudyLink to slug
  authorName?: string; // New prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  slug,
  authorName, // Destructure new prop
}) => {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      <img
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        alt={imageAlt}
        src={imageSrc}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-stone-200">{tags}</p>
        {authorName && <p className="text-xs text-stone-300">by {authorName}</p>} {/* Display author name */}
      </div>
      <Link to={`/projects/${slug}`} className="absolute inset-0 flex translate-y-full flex-col items-center justify-center bg-glass-dark/50 p-6 text-center opacity-0 backdrop-blur-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="mb-4 text-white">{description}</p>
        <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-stone-200">
          View Case Study
        </span>
      </Link>
    </div>
  );
};

export default ProjectCard;