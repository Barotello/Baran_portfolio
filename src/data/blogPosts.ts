export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-fluid-interface-liquid-glass",
    category: "Case Study",
    title: "Designing a fluid interface with the 'liquid glass' aesthetic",
    description: "An in-depth look at the principles behind creating modern, translucent UIs inspired by Apple's design language.",
    date: "October 26, 2023",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDg-OKKQaFs8KyIThIThI8-XgyejCX_-JuwT1QS6fzXlfKnNRAY8AyuvJvQMq8nIPuMCgCoH_Tk4aCiTfFeygppDV1VkkUIFceRLzo9FH2yOWNCVh6Tu4RDc4wrlH16VjCOnJexeXOt0kTusMlPioGQyS6MUGw-oNJkSSPhzDEAeOozWoaFYZ40ZR2MbrAJ5QC6R0AkN3ltubNOYdFiWBS2uvi95u8-A0GjFFOxcpHAHQam_-3aaWmvi0_xvK1B5KoU7_HtwBRL4gNxxA",
    imageAlt: "Abstract gradient with blue and purple tones",
  },
  {
    slug: "building-performant-web-animations-css",
    category: "Development",
    title: "Building Performant Web Animations with CSS",
    description: "A guide to leveraging hardware acceleration and best practices for creating smooth, jank-free animations on the web.",
    date: "September 15, 2023",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoCUoA4uLI_Ehad-MZX-Xo7s9VdGHDxGscx9oVf4iwB3T_PDBINCNIQC-DaV-Y66vR7QzzR1TVR8uV9GTaC5FsiXebFtqdKXpVOXvkAwpyuBkntn00eLHWT6Ib9IKkbitSuvrNkd42lNpyIbuXHqlLn7xIACGsI7kQD2JfHD20nGQZFOCgjzp9FJXJpvx-xXHl50pR9WVRj3TcqBeyNT5FGV0H32M2BGLd1QRddn3kObq-ZqIqKulM07DhrOA8SJlkfFFnh9dLjA",
    imageAlt: "Minimalist desk setup with a laptop and a notebook",
  },
  {
    slug: "psychology-of-color-ui-design",
    category: "UI/UX",
    title: "The Psychology of Color in UI Design",
    description: "Exploring how color impacts user perception, emotion, and decision-making in digital products.",
    date: "August 02, 2023",
    imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_NBVOc-3sv3Zf-nHKnNZlW1D02XxrdTH9bTSqp2NMwqoJWiktPnhmSFev630goT2Bj15LtPTuuOUzxQhJTujZc7pFf8Lt0c-j4mrdnJ2rVc2K4xT3QnrZ-UvYXwaklKyA7WJlSFsoqCzcynBrAC6nNzl-LxggFWxrqk_VeOjVgADN_BBPtII9kPMfRbkBHCTFH7uR1hno0luO6LTJi3X_5a0HCZ2aVbhQtGwhabVkxM37tnHuOHYeNCT0nkrbSqbOBGzBzCMxnA",
    imageAlt: "Colorful user interface design mockups on a screen",
  },
];