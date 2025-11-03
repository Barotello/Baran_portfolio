import { Github, Globe } from "lucide-react";

export interface Project {
  slug: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  tags: string;
  caseStudyLink: string;
  overview: string;
  problem: string;
  solution: string;
  role: string[];
  technologies: string[];
  liveWebsiteLink?: string;
  githubRepoLink?: string;
  nextProjectSlug?: string; // For linking to the next project
}

export const projects: Project[] = [
  {
    slug: "e-commerce-platform-redesign",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAukUIjSMdEwW2ClPCIfIYcOO6jcwnzKqmDPbAf4y4IpjWdQnu1kDAbaI6E8Xf0aq0klxrDRGpf6oYaW9b4c6M6fWh202HUt29tGDom1nAJetbFvBpPL1wpG9J3HWvF0OpByj4uUEy2OHpIQ8INR-nMxdhZUelRhfMKetl61yZvmxFYrrzCA6X9Jg0TxbuYo19El7JZZmyNLKK0USV6WKQtWtqEkYP9GWKNRDRT6qBOau5V-oib3nvj-9fIIdl3iW0vx-iJb7hv0Q",
    imageAlt: "Abstract gradient of blue and purple light trails against a dark background, representing a tech platform.",
    title: "E-commerce Platform Redesign",
    tags: "UI/UX Design, Web Development",
    description: "A complete overhaul of a multi-vendor marketplace, focusing on user experience and conversion optimization.",
    caseStudyLink: "/projects/e-commerce-platform-redesign",
    overview: "The project involved a comprehensive redesign of a legacy e-commerce platform that struggled with low user engagement and a high cart abandonment rate. The goal was to create a modern, intuitive, and visually appealing marketplace that would not only attract new users but also retain existing ones by simplifying the shopping journey from discovery to checkout. We conducted extensive user research, competitor analysis, and stakeholder interviews to identify key pain points and opportunities. The new design system focused on clarity, consistency, and accessibility, featuring a streamlined navigation, powerful search functionality, and a personalized user dashboard.",
    problem: "The existing platform was outdated, with a cluttered interface, confusing navigation, and a slow, multi-step checkout process. This led to user frustration, high bounce rates, and ultimately, lost revenue for the vendors.",
    solution: "We implemented a mobile-first, component-based design system. Key improvements included a simplified one-page checkout, advanced product filtering, and personalized recommendations, resulting in a 40% increase in conversions.",
    role: ["Lead UI/UX Designer", "Front-End Development", "User Research & Testing", "Prototyping & Wireframing"],
    technologies: ["Figma", "React", "Next.js", "Tailwind CSS", "Vercel"],
    liveWebsiteLink: "#",
    githubRepoLink: "#",
    nextProjectSlug: "mobile-banking-app",
  },
  {
    slug: "mobile-banking-app",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDCoZlA8bAFes_dBqFGOThEyTaF4JCX93LdHJuFwVXySddp-tp5H49whjbm-ccLIKM-KpxgoVc2j4MpokGRa5RE6zt-esIREfJyHR6VQb-rKVdcOTGGHTQqXyMIW81mqFQVxcOGz9k2W2u6XMr814fSzd69Kfr0tFplmkJbTucIFADaD7BxjeCEcOP9v7DBiPlegF3cErXaPeMIlmo_Qb1WtqeatWeeBz4DWdEMRNc9b0H42mOB2XwirPI1fNH5D7sdCwdt6L4g",
    imageAlt: "A smartphone displaying a banking app interface, held over a clean desk with a laptop.",
    title: "Mobile Banking App",
    tags: "Mobile UI Design, Prototyping",
    description: "Designing a secure and user-friendly mobile app for seamless personal finance management.",
    caseStudyLink: "/projects/mobile-banking-app",
    overview: "This project focused on creating a secure and intuitive mobile banking application from the ground up. The primary objective was to provide users with a seamless experience for managing their finances on the go, including features like account overview, transfers, bill payments, and budgeting tools. Extensive user testing was conducted to ensure the app met the needs of diverse user groups.",
    problem: "Existing mobile banking solutions often suffered from complex interfaces, slow performance, and a lack of modern features, leading to low user satisfaction and adoption rates.",
    solution: "We developed a clean, minimalist design with a strong emphasis on ease of use and security. Key features included biometric authentication, real-time transaction alerts, and an AI-powered budgeting assistant, resulting in high user engagement and positive feedback.",
    role: ["Mobile UI Designer", "Prototyping", "User Experience Research", "Interaction Design"],
    technologies: ["Figma", "SwiftUI", "Kotlin", "Firebase"],
    liveWebsiteLink: "#",
    githubRepoLink: "#",
    nextProjectSlug: "saas-analytics-dashboard",
  },
  {
    slug: "saas-analytics-dashboard",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTFmJvEDJZJWzREuR7wcGuYiLevwsDFTOKWAnTKn9LxcVLFJEOCIPZvZv59FapronrwlHEKOxaq88WArIY6Ztikfo-A0A3UPjHsOBztkrCGPMdsoA8E6dRT5dBBpegLCPjbc3lRkHGl4IoaLECbifchi4c8wa5r3sjbWJltY5Fi5cu3y0VocDQKwn0WUx41AIVK1bC0dtsRVCzmD7Dt8L5NLPV7QOIeDn0nVG_UDkPwJLHZLQ-Mp6gzyA_WfU9nUwod8VaEBNYouQ",
    imageAlt: "A computer screen showing a complex data analytics dashboard with various charts and graphs.",
    title: "SaaS Analytics Dashboard",
    tags: "UI Design, Data Visualization",
    description: "Creating an intuitive dashboard to help businesses visualize complex data and make informed decisions.",
    caseStudyLink: "/projects/saas-analytics-dashboard",
    overview: "This project involved designing a comprehensive analytics dashboard for a SaaS product, aimed at providing businesses with actionable insights from their data. The challenge was to present complex data in a clear, digestible, and visually engaging manner, allowing users to quickly identify trends and make data-driven decisions.",
    problem: "Clients struggled to interpret raw data and existing dashboards were overwhelming, lacking customization and real-time updates, which hindered effective decision-making.",
    solution: "We developed a modular dashboard with customizable widgets, interactive charts, and real-time data streaming. The design focused on a hierarchical information architecture, enabling users to drill down into specific metrics, leading to improved data literacy and faster insights.",
    role: ["UI Designer", "Data Visualization Specialist", "User Flow Mapping", "Component Library Development"],
    technologies: ["Figma", "React", "D3.js", "Chart.js", "TypeScript"],
    liveWebsiteLink: "#",
    githubRepoLink: "#",
    nextProjectSlug: "developer-api-portal",
  },
  {
    slug: "developer-api-portal",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuAttMQ5SJZto7bD1dBfXKUvWNmqSip6U1p_U1dkchsdIPqVFbTsSnnEPogCGcpvPBgli7lofTSt0B81meUD8nNWwqcE61cFNcGSXgJfRstFfDl3pw0uHZqAkcPXM_cA1Ktngs8YKqXrY1n55lQ7WnaGpxgggwUQRAxsDKt8PmV9NeKk5IUl_HMMLhMr-wdB2Icpw3d_vIVAlO57PP2ScU5Wr7uKTWM2SRl3b0AlFm7dPnqjRsaitr9rnQ907USzNCeqoZ_uG7Js4w",
    imageAlt: "Developer's workspace with code on a monitor, indicating a software development project.",
    title: "Developer API Portal",
    tags: "Web Development, UX Research",
    description: "Building a comprehensive and easy-to-navigate portal for developers using our company's API.",
    caseStudyLink: "/projects/developer-api-portal",
    overview: "This project involved designing and developing a comprehensive developer API portal to facilitate seamless integration of our company's services. The goal was to provide clear documentation, interactive examples, and a user-friendly interface for developers to explore, test, and implement our APIs efficiently.",
    problem: "Existing API documentation was fragmented and difficult to navigate, leading to a steep learning curve for new developers and increased support requests.",
    solution: "We created a centralized portal with interactive API explorers, code snippets in multiple languages, and a robust search function. The design prioritized developer experience, resulting in a significant reduction in integration time and improved developer satisfaction.",
    role: ["Full-Stack Developer", "UX Researcher", "Technical Writer", "API Documentation Specialist"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Swagger UI"],
    liveWebsiteLink: "#",
    githubRepoLink: "#",
  },
];