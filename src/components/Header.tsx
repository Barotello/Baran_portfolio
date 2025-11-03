import React from "react";
import { Link, NavLink } from "react-router-dom"; // Import NavLink for active link styling
import { ThemeToggle } from "./ThemeToggle"; // Import the new ThemeToggle component

const Header: React.FC = () => {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-glass-border-light dark:border-glass-border-dark bg-glass-light dark:bg-glass-dark p-2.5 shadow-lg backdrop-blur-xl">
        <Link className="flex items-center gap-2 pl-3" to="/"> {/* Use Link for home */}
          <span className="font-bold text-lg">BD</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link className="transition hover:text-primary" to="/#projects">Projects</Link>
          <NavLink
            className={({ isActive }) =>
              `transition ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
            }
            to="/about"
          >
            About
          </NavLink>
          <Link className="transition hover:text-primary" to="/#contact">Contact</Link>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <ThemeToggle /> {/* Replaced Share2 icon with ThemeToggle */}
          <Link className="hidden h-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-4 text-sm font-bold text-white transition hover:opacity-90 sm:flex" to="/#contact">
            <span className="truncate">Get In Touch</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;