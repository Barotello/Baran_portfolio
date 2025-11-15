import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import BlogPostCard from "@/components/BlogPostCard";
import { BlogPost } from "@/data/blogPosts";
import { supabase } from "@/integrations/supabase/client";
import { showError } from "@/utils/toast";

const Blog: React.FC = () => {
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]); // Kategorileri dinamik hale getiriyoruz

  useEffect(() => {
    const fetchBlogPostsAndCategories = async () => {
      setLoading(true);
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts')
        .select('*, profiles(first_name, last_name)') // Yazar bilgilerini çekiyoruz
        .order('date', { ascending: false });

      if (postsError) {
        showError("Error fetching blog posts: " + postsError.message);
      } else {
        const formattedPosts = postsData?.map(post => ({
          ...post,
          author_name: post.profiles ? `${post.profiles.first_name || ''} ${post.profiles.last_name || ''}`.trim() : 'Unknown Author'
        })) || [];
        setAllBlogPosts(formattedPosts);

        // Benzersiz kategorileri çıkar ve 'All' ile birleştir
        const uniqueCategories = Array.from(new Set(postsData?.map(post => post.category))).filter(Boolean) as string[];
        setCategories(["All", ...uniqueCategories]);
      }
      setLoading(false);
    };

    fetchBlogPostsAndCategories();
  }, []);

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 px-4 sm:px-8 md:px-20 lg:px-40 py-5 min-h-[60vh]">
          <p className="text-center">Loading journal entries...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-7xl flex-1 flex-col gap-8 px-4 sm:px-8 md:px-20 lg:px-40 py-5">
        {/* PageHeading */}
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Journal</h1>
            <p className="text-base font-normal leading-normal text-gray-600 dark:text-gray-400">A collection of my thoughts on design, development, and everything in between.</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-6 px-4">
          {/* SearchBar */}
          <div className="flex flex-col h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-full border border-white/20 bg-white/40 shadow-sm backdrop-blur-md dark:bg-black/30">
              <div className="flex items-center justify-center pl-4 text-gray-600 dark:text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <Input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full border-none bg-transparent px-4 text-base font-normal leading-normal text-gray-900 placeholder:text-gray-500 focus:outline-0 focus:ring-0 dark:text-white dark:placeholder:text-gray-400"
                placeholder="Search articles"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {/* Chips */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category}
                className={`flex h-8 cursor-pointer items-center justify-center gap-x-2 rounded-full px-4 text-sm font-medium leading-normal transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "border border-white/20 bg-white/40 backdrop-blur-md hover:bg-white/60 dark:bg-black/30 dark:hover:bg-black/50 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                <p>{category}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 gap-8 p-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogPostCard
                key={post.id}
                slug={post.slug}
                category={post.category}
                title={post.title}
                description={post.description}
                date={post.date}
                imageSrc={post.image_src}
                imageAlt={post.image_alt}
                authorName={post.author_name} // Pass author name
              />
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No journal entries found matching your criteria.</p>
          )}
        </div>

        {/* Pagination (Placeholder for now, can be implemented later) */}
        <div className="flex items-center justify-center gap-4 p-4">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/20 bg-white/40 text-gray-600 backdrop-blur-md hover:bg-white/60 dark:bg-black/30 dark:text-gray-400 dark:hover:bg-black/50">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Page 1 of 1</span>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/20 bg-white/40 text-gray-600 backdrop-blur-md hover:bg-white/60 dark:bg-black/30 dark:text-gray-400 dark:hover:bg-black/50">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Blog;