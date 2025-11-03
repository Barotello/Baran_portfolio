import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAukUIjSMdEwW2ClPCIfIYcOO6jcwnzKqmDPbAf4y4IpjWdQnu1kDAbaI6E8Xf0aq0klxrDRGpf6oYaW9b4c6M6fWh202HUt29tGDom1nAJetbFvBpPL1wpG9J3HWvF0OpByj4uUEy2OHpIQ8INR-nMxdhZUelRhfMKetl61yZvmxFYrrzCA6X9Jg0TxbuYo19El7JZZmyNLKK0USV6WKQtWtqEkYP9GWKNRDRT6qBOau5V-oib3nvj-9fIIdl3iW0vx-iJb7hv0Q",
    imageAlt: "Abstract gradient of blue and purple light trails against a dark background, representing a tech platform.",
    title: "E-commerce Platform Redesign",
    tags: "UI/UX Design, Web Development",
    description: "A complete overhaul of a multi-vendor marketplace, focusing on user experience and conversion optimization.",
    caseStudyLink: "#",
  },
  {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDCoZlA8bAFes_dBqFGOThEyTaF4JCX93LdHJuFwVXySddp-tp5H49whjbm-ccLIKM-KpxgoVc2j4MpokGRa5RE6zt-esIREfJyHR6VQb-rKVdcOTGGHTQqXyMIW81mqFQVxcOGz9k2W2u6XMr814fSzd69Kfr0tFplmkJbTucIFADaD7BxjeCEcOP9v7DBiPlegF3cErXaPeMIlmo_Qb1WtqeatWeeBz4DWdEMRNc9b0H42mOB2XwirPI1fNH5D7sdCwdt6L4g",
    imageAlt: "A smartphone displaying a banking app interface, held over a clean desk with a laptop.",
    title: "Mobile Banking App",
    tags: "Mobile UI Design, Prototyping",
    description: "Designing a secure and user-friendly mobile app for seamless personal finance management.",
    caseStudyLink: "#",
  },
  {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTFmJvEDJZJWzREuR7wcGuYiLevwsDFTOKWAnTKn9LxcVLFJEOCIPZvZv59FapronrwlHEKOxaq88WArIY6Ztikfo-A0A3UPjHsOBztkrCGPMdsoA8E6dRT5dBBpegLCPjbc3lRkHGl4IoaLECbifchi4c8wa5r3sjbWJltY5Fi5cu3y0VocDQKwn0WUx41AIVK1bC0dtsRVCzmD7Dt8L5NLPV7QOIeDn0nVG_UDkPwJLHZLQ-Mp6gzyA_WfU9nUwod8VaEBNYouQ",
    imageAlt: "A computer screen showing a complex data analytics dashboard with various charts and graphs.",
    title: "SaaS Analytics Dashboard",
    tags: "UI Design, Data Visualization",
    description: "Creating an intuitive dashboard to help businesses visualize complex data and make informed decisions.",
    caseStudyLink: "#",
  },
  {
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAttMQ5SJZto7bD1dBfXKUvWNmqSip6U1p_U1dkchsdIPqVFbTsSnnEPogCGcpvPBgli7lofTSt0B81meUD8nNWwqcE61cFNcGSXgJfRstFfDl3pw0uHZqAkcPXM_cA1Ktngs8YKqXrY1n55lQ7WnaGpxgggwUQRAxsDKt8PmV9NeKk5IUl_HMMLhMr-wdB2Icpw3d_vIVAlO57PP2ScU5Wr7uKTWM2SRl3b0AlFm7dPnqjRsaitr9rnQ907USzNCeqoZ_uG7Js4w",
    imageAlt: "Developer's workspace with code on a monitor, indicating a software development project.",
    title: "Developer API Portal",
    tags: "Web Development, UX Research",
    description: "Building a comprehensive and easy-to-navigate portal for developers using our company's API.",
    caseStudyLink: "#",
  },
];

const ProjectsSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24" id="projects">
      <h2 className="mb-8 text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Selected Work</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            imageSrc={project.imageSrc}
            imageAlt={project.imageAlt}
            title={project.title}
            tags={project.tags}
            description={project.description}
            caseStudyLink={project.caseStudyLink}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;