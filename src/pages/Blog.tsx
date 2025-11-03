import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Blog: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Coming soon! Stay tuned for new posts.</p>
        {/* Blog content will go here */}
      </main>
      <Footer />
    </Layout>
  );
};

export default Blog;