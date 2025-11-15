import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/data/blogPosts";
import { showError } from "@/utils/toast";
import { format } from "date-fns";

const BlogSection: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false })
        .limit(3); // Sadece en son 3 blog yazısını göster

      if (error) {
        showError("Error fetching blog posts: " + error.message);
      } else {
        setBlogPosts(data || []);
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-16 lg:py-24" id="journal">
        <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Latest Journal Entries</h2>
          <p className="text-center">Loading journal entries...</p>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section className="w-full py-16 lg:py-24" id="journal">
        <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
          <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Latest Journal Entries</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">No journal entries to display yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 lg:py-24" id="journal">
      <div className="mx-auto max-w-4xl px-4"> {/* İçerik için yeni sarmalayıcı */}
        <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Latest Journal Entries</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id} className="group flex flex-col rounded-xl border border-white/20 bg-white/40 p-4 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02] dark:bg-black/30">
              <div
                className="w-full shrink-0 rounded-lg bg-cover bg-center bg-no-repeat aspect-video"
                style={{ backgroundImage: `url("${post.image_src}")` }}
                aria-label={post.image_alt}
              ></div>
              <div className="flex w-full min-w-0 grow flex-col items-stretch justify-center gap-2 py-4">
                <p className="text-sm font-normal uppercase tracking-wider text-primary dark:text-primary">
                  {post.category}
                </p>
                <p className="text-xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">
                  {post.title}
                </p>
                <p className="text-base font-normal leading-normal text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {format(new Date(post.date), 'dd MMMM yyyy')}
                  </p>
                  <span className="flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-8 text-sm font-medium text-primary hover:text-primary/80">
                    <span className="truncate">Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/blog" className="flex h-11 min-w-[84px] max-w-[480px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-base font-bold text-white transition hover:opacity-90">
            <span className="truncate">View All Journal Entries</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;