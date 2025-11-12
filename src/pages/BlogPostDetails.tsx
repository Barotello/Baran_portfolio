import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/data/blogPosts";
import { showError } from "@/utils/toast";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks'; // remark-breaks'i import ediyoruz
import { format } from "date-fns";

const BlogPostDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPostDetails = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        showError("Error fetching blog post details: " + error.message);
        setBlogPost(null);
      } else {
        setBlogPost(data);
      }
      setLoading(false);
    };

    fetchBlogPostDetails();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading blog post details...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  if (!blogPost) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Blog post not found!</p>
          <Link to="/blog" className="text-blue-500 hover:text-blue-700 underline">
            Return to Journal
          </Link>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <article className="w-full">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Journal
          </Link>

          <div className="flex flex-col items-center justify-center gap-4 text-center mb-12">
            <p className="text-sm font-normal uppercase tracking-wider text-primary dark:text-primary">
              {blogPost.category}
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              {blogPost.title}
            </h1>
            <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl">
              {blogPost.description}
            </p>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {format(new Date(blogPost.date), 'dd MMMM yyyy')}
            </p>
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-glass-border-light/50 dark:border-glass-border-dark/50 shadow-2xl mb-12">
            <img
              alt={blogPost.image_alt}
              className="h-full w-full object-cover"
              src={blogPost.image_src}
            />
          </div>

          <div className="prose dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed text-justify">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              }}
            >
              {blogPost.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </Layout>
  );
};

export default BlogPostDetails;