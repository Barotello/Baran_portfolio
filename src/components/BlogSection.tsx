import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/data/blogPosts";
import { showError } from "@/utils/toast";
import BlogPostCard from "./BlogPostCard"; // BlogPostCard'ı import ediyoruz

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
            <BlogPostCard
              key={post.id}
              slug={post.slug}
              category={post.category}
              title={post.title}
              description={post.description}
              date={post.date}
              imageSrc={post.image_src}
              imageAlt={post.image_alt}
            />
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