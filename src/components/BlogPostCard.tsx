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
  const formattedDate = format(new Date(date), 'dd MMMM yyyy');

  return (
    <div className="@container">
      <Link to={`/blog/${slug}`} className="flex flex-col items-stretch justify-start rounded-xl border border-white/20 bg-white/40 p-4 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02] dark:bg-black/30 @xl:flex-row @xl:items-start @xl:p-6">
        <div
          className="w-full shrink-0 rounded-lg bg-cover bg-center bg-no-repeat aspect-video @xl:w-80 @xl:aspect-square"
          style={{ backgroundImage: `url("${imageSrc}")` }}
          aria-label={imageAlt}
        ></div>
        <div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-2 py-4 @xl:px-6 @xl:py-0">
          <p className="text-sm font-normal uppercase tracking-wider text-primary dark:text-primary">
            {category}
          </p>
          <p className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
            {title}
          </p>
          <p className="text-base font-normal leading-normal text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {formattedDate}
            </p>
            {/* "Read More" butonu kaldırıldı */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;