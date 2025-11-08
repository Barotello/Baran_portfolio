import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useSession } from "@/integrations/supabase/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

const Header: React.FC = () => {
  const { session, isLoading } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Failed to log out: " + error.message);
    } else {
      showSuccess("Logged out successfully!");
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-4 z-50 mx-auto max-w-4xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-glass-border-light dark:border-glass-border-dark bg-glass-light dark:bg-glass-dark p-2.5 shadow-lg backdrop-blur-xl">
        <Link className="flex items-center gap-2 pl-3" to="/">
          <span className="font-bold text-lg">BD</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <NavLink
            className={({ isActive }) =>
              `transition uppercase ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
            }
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `transition uppercase ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `transition uppercase ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
            }
            to="/blog"
          >
            Journal
          </NavLink>
        </div>
        <div className="flex items-center gap-2 pr-1">
          <ThemeToggle />
          {!isLoading && (
            session ? (
              <Button
                variant="ghost"
                size="icon"
                className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-black/5 dark:hover:bg-white/10"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <Button
                className="flex h-9 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-4 text-sm font-bold text-white transition hover:opacity-90"
                onClick={() => navigate('/login')}
                aria-label="Login"
              >
                <LogIn className="h-5 w-5 mr-2" />
                <span className="truncate">Login</span>
              </Button>
            )
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;