import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ProjectsPage from "./pages/ProjectsPage";
import Login from "./pages/Login";
import ManageProjects from "./pages/Admin/ManageProjects";
import ManageBlogPosts from "./pages/Admin/ManageBlogPosts";
import ManageAbout from "./pages/Admin/ManageAbout"; // Import ManageAbout page
import BlogPostDetails from "./pages/BlogPostDetails";
import { SessionContextProvider } from "./integrations/supabase/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <SessionContextProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/projects" element={<ManageProjects />} />
              <Route path="/admin/blog" element={<ManageBlogPosts />} />
              <Route path="/admin/about" element={<ManageAbout />} /> {/* Add ManageAbout route */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;