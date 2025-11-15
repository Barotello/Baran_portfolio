import { Github, Globe } from "lucide-react";

export interface Project {
  id?: string; // Supabase will generate this
  user_id?: string; // Supabase will link this to the authenticated user
  slug: string;
  image_src: string; // Renamed to match DB schema
  image_alt: string; // Renamed to match DB schema
  title: string;
  description: string;
  tags: string;
  overview: string;
  problem: string;
  solution: string;
  role: string[];
  technologies: string[];
  live_website_link?: string;
  github_repo_link?: string;
  next_project_slug?: string; // For linking to the next project
  created_at?: string; // Supabase will generate this
  author_name?: string; // New field for author's full name
}

// Statik projeler dizisi kaldırıldı. Veriler artık Supabase'den çekilecek.
export const projects: Project[] = [];