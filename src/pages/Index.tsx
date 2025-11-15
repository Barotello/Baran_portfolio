import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal"; // Yeni bileşeni import ediyoruz

const Index: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="flex flex-col items-center pt-16 sm:pt-24 lg:pt-32">
        <ScrollReveal>
          <div className="w-full">
            <HeroSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <div className="w-full">
            <ProjectsSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <div className="w-full">
            <AboutSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="w-full">
            <BlogSection />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="w-full">
            <ContactSection />
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </Layout>
  );
};

export default Index;