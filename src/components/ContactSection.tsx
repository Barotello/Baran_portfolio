import React from "react";
import { Linkedin, Github } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-center lg:py-24" id="contact">
      <div className="mx-auto max-w-4xl px-4 flex flex-col items-center gap-4"> {/* İçerik için yeni sarmalayıcı */}
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Let's Connect</h2>
        <p className="max-w-xl text-stone-600 dark:text-stone-300">
          Have a project in mind, or just want to say hello? I'd love to hear from you. Feel free to reach out via email or connect with me on social media.
        </p>
        {/* Doğrudan e-posta adresi kaldırıldı */}
        <div className="mt-4 flex gap-4">
          <a aria-label="LinkedIn" className="grid h-12 w-12 place-items-center rounded-full border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 transition hover:bg-black/5 dark:hover:bg-white/10" href="https://www.linkedin.com/in/barandemirtas1" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6" />
          </a>
          <a aria-label="GitHub" className="grid h-12 w-12 place-items-center rounded-full border border-glass-border-light dark:border-glass-border-dark bg-glass-light/50 dark:bg-glass-dark/50 transition hover:bg-black/5 dark:hover:bg-white/10" href="https://github.com/Barotello" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;