import React from "react";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index: React.FC = () => {
  return (
    <Layout>
      <Header />
      <main className="flex flex-col items-center pt-16 sm:pt-24 lg:pt-32"> {/* max-w-4xl ve px-4 kaldırıldı */}
        <div className="w-full bg-background"> {/* HeroSection için varsayılan arka plan */}
          <HeroSection />
        </div>
        <div className="w-full bg-muted"> {/* ProjectsSection için farklı arka plan */}
          <ProjectsSection />
        </div>
        <div className="w-full bg-background"> {/* AboutSection için varsayılan arka plan */}
          <AboutSection />
        </div>
        <div className="w-full bg-muted"> {/* BlogSection için farklı arka plan */}
          <BlogSection />
        </div>
        <div className="w-full bg-background"> {/* ContactSection için varsayılan arka plan */}
          <ContactSection />
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

export default Index;