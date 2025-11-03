import React from "react";
import { Share2 } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-glass-border-light dark:border-glass-border-dark bg-glass-light dark:bg-glass-dark p-2.5 shadow-lg backdrop-blur-xl">
        <a className="flex items-center gap-2 pl-3" href="#">
          <span className="font-bold text-lg">JD</span>
        </a>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <a className="transition hover:text-primary" href="#projects">Projects</a>
          <a className="transition hover:text-primary" href="#about">About</a>
          <a className="transition hover:text-primary" href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <a className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10" href="#">
            <Share2 className="h-5 w-5" />
          </a>
          <a className="hidden h-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-4 text-sm font-bold text-white transition hover:opacity-90 sm:flex" href="#contact">
            <span className="truncate">Get In Touch</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;