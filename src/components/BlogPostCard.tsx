import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface BlogPostCardProps {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  slug,
  category,
  title,
  description,
  date,
  imageSrc,
  imageAlt,
}) => {
  const formattedDate = format(new Date(date), 'MMMM dd, yyyy');

  return (
    <div className="relative @container group aspect-video rounded-xl overflow-hidden
                    border border-white/20 bg-white/40 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02] dark:bg-black/30">
      {/* Background Image */}
      <img
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        alt={imageAlt}
        src={imageSrc}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/70"></div>

      {/* Content Overlay (clickable) */}
      <Link
        to={`/blog/${slug}`}
        className="absolute inset-0 z-10 flex flex-col items-stretch justify-start p-4 text-white
                   @xl:flex-row @xl:items-start @xl:p-6"
      >
        {/* The actual content */}
        <div className="flex w-full min-w-0 grow flex-col items-stretch justify-end gap-2 text-white">
          <p className="text-sm font-normal uppercase tracking-wider text-primary dark:text-primary">
            {category}
          </p>
          <p className="text-xl font-bold leading-tight tracking-[-0.015em]">
            {title}
          </p>
          <p className="text-base font-normal leading-normal line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm font-normal">
              {formattedDate}
            </p>
            <span className="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-8 text-sm font-medium text-primary hover:text-primary/80">
              <span className="truncate">Read More</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;