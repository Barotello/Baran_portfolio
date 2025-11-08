import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap, Download, Award } from "lucide-react"; // Award ikonunu import ediyoruz
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { AboutSection } from "@/data/about";
import { showError } from "@/utils/toast";
import AboutLoginSection from "@/components/AboutLoginSection"; // Yeni bileşeni import ediyoruz

const About: React.FC = () => {
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('about_sections')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) {
        showError("Error fetching about content: " + error.message);
      } else {
        setAboutSections(data || []);
      }
      setLoading(false);
    };

    fetchAboutContent();
  }, []);

  const renderSection = (section: AboutSection) => {
    switch (section.section_type) {
      case 'summary':
        return (
          <p className="text-stone-600 dark:text-stone-400 text-justify"> {/* text-justify sınıfı eklendi */}
            {section.description}
          </p>
        );
      case 'experience':
        return (
          <div className="flex gap-6">
            <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-bold">{section.job_title}</h4> {/* Using job_title */}
                {section.subtitle && <span className="text-sm text-stone-500 dark:text-stone-400">{section.subtitle}</span>}
              </div>
              {section.company_name && <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{section.company_name}</p>} {/* Using company_name */}
              {section.details && section.details.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-stone-600 dark:text-stone-400 text-sm space-y-1">
                  {section.details.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        );
      case 'education':
        return (
          <div className="flex gap-6">
            <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="font-bold">{section.title}</h4>
                {section.subtitle && <span className="text-sm text-stone-500 dark:text-stone-400">{section.subtitle}</span>}
              </div>
              {section.description && <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{section.description}</p>}
              {section.gpa && <p className="text-sm text-stone-600 dark:text-stone-400">GPA: {section.gpa}</p>}
            </div>
          </div>
        );
      case 'skill_category':
        return (
          <div>
            <h4 className="mb-4 text-lg font-semibold">{section.title}</h4>
            {section.details && section.details.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {section.details.map((skill, i) => (
                  <span key={i} className="rounded-full border border-primary/50 bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      case 'language':
        return (
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="font-bold">{section.title}</h4>
            {section.subtitle && <p className="text-sm text-stone-600 dark:text-stone-400">{section.subtitle}</p>}
          </div>
        );
      case 'certificate':
        return (
          <div className="flex gap-6">
            <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-primary">
              <Award className="h-6 w-6" /> {/* Award ikonunu buraya ekliyoruz */}
            </div>
            <div className="flex-1">
              <h4 className="font-bold">{section.title}</h4>
              {section.details && section.details.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-stone-600 dark:text-stone-400 text-sm space-y-1">
                  {section.details.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading About Me content...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  const summarySection = aboutSections.find(s => s.section_type === 'summary');
  const experienceSections = aboutSections.filter(s => s.section_type === 'experience');
  const educationSections = aboutSections.filter(s => s.section_type === 'education');
  const skillCategories = aboutSections.filter(s => s.section_type === 'skill_category');
  const languageSections = aboutSections.filter(s => s.section_type === 'language');
  const certificateSections = aboutSections.filter(s => s.section_type === 'certificate');

  return (
    <Layout>
      <Header />
      <main className="mx-auto max-w-6xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32">
        <section className="w-full" id="about-me">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
            <div className="sticky top-32 flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
              <img
                className="aspect-square w-48 rounded-full object-cover shadow-lg lg:w-full lg:rounded-2xl"
                alt="Professional headshot of Baran Demirtaş, smiling warmly."
                src="/images/baran.png"
              />
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight">Baran Demirtaş</h1>
                <h2 className="text-xl font-display font-medium text-stone-600 dark:text-stone-300">
                  {summarySection?.title || "System & Network Engineer"}
                </h2>
              </div>
              {summarySection && renderSection(summarySection)}
              <a
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-white transition hover:opacity-90 sm:w-auto"
                href="#" // Buraya CV dosyanızın linkini ekleyebilirsiniz
              >
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </div>
            <div className="flex flex-col gap-12 lg:col-span-2">
              {experienceSections.length > 0 && (
                <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                  <h3 className="text-2xl font-bold">Experience</h3>
                  <div className="flex flex-col gap-8">
                    {experienceSections.map((section) => (
                      <React.Fragment key={section.id}>
                        {renderSection(section)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {educationSections.length > 0 && (
                <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                  <h3 className="text-2xl font-bold">Education</h3>
                  <div className="flex flex-col gap-8">
                    {educationSections.map((section) => (
                      <React.Fragment key={section.id}>
                        {renderSection(section)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {skillCategories.length > 0 && (
                <div className="rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                  <h3 className="mb-6 text-2xl font-bold">Skills</h3>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {skillCategories.map((section) => (
                      <React.Fragment key={section.id}>
                        {renderSection(section)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {languageSections.length > 0 && (
                <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                  <h3 className="text-2xl font-bold">Languages</h3>
                  <div className="flex flex-col gap-4">
                    {languageSections.map((section) => (
                      <React.Fragment key={section.id}>
                        {renderSection(section)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {certificateSections.length > 0 && (
                <div className="flex flex-col gap-8 rounded-2xl border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 p-8 shadow-lg backdrop-blur-xl">
                  <h3 className="text-2xl font-bold">Certificates</h3>
                  <div className="flex flex-col gap-4">
                    {certificateSections.map((section) => (
                      <React.Fragment key={section.id}>
                        {renderSection(section)}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-16 lg:py-24">
          <AboutLoginSection /> {/* Giriş bölümünü buraya ekliyoruz */}
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default About;