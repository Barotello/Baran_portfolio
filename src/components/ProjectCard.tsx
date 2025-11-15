import React from "react";
import { Link } from "react-router-dom";
import ImageLightbox from "./ImageLightbox"; // Yeni ImageLightbox bileşenini import ediyoruz

interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string;
  slug: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  description,
  tags,
  slug,
}) => {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl">
      {/* ImageLightbox'ı görselin etrafına sarıyoruz */}
      <ImageLightbox src={imageSrc} alt={imageAlt}>
        {/* DialogTrigger'ın Link'i tetiklemesini engellemek için onClick kullanıyoruz */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={(e) => e.stopPropagation()} // Link'in tetiklenmesini engelle
          aria-label={`View larger image of ${title}`}
        >
          <img
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            alt={imageAlt}
            src={imageSrc}
          />
        </div>
      </ImageLightbox>
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-stone-200">{tags}</p>
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