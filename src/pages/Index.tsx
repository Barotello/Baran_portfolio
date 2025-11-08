import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection"; // Yeni AboutSection'ı import ediyoruz
import BlogSection from "@/components/BlogSection";   // Yeni BlogSection'ı import ediyoruz
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <HeroSection />
        <ProjectsSection />
        <AboutSection /> {/* AboutSection'ı ekliyoruz */}
        <BlogSection />   {/* BlogSection'ı ekliyoruz */}
        <ContactSection />
      </main>
      <Footer />
    </Layout>
  );
};

export default Index;