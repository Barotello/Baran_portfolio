import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense } from "react"; // React ve Suspense'i import ediyoruz
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
// Tüm sayfa bileşenlerini React.lazy ile tembel yüklüyoruz
const Index = React.lazy(() => import("./pages/Index"));
const ProjectsPage = React.lazy(() => import("./pages/ProjectsPage"));
const ProjectDetails = React.lazy(() => import("./pages/ProjectDetails"));
const About = React.lazy(() => import("./pages/About"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPostDetails = React.lazy(() => import("./pages/BlogPostDetails"));
const Login = React.lazy(() => import("./pages/Login"));
const ManageProjects = React.lazy(() => import("./pages/Admin/ManageProjects"));
const ManageBlogPosts = React.lazy(() => import("./pages/Admin/ManageBlogPosts"));
const ManageAbout = React.lazy(() => import("./pages/Admin/ManageAbout"));
const ManageProfile = React.lazy(() => import("./pages/Admin/ManageProfile"));
const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

import { SessionContextProvider } from "./integrations/supabase/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter future={{ v7_relativeSplatPath: true }}>
          <SessionContextProvider>
            {/* Suspense ile tembel yüklenen bileşenler için bir geri dönüş sağlıyoruz */}
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                Yükleniyor...
              </div>
            }>
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
                <Route path="/admin/about" element={<ManageAbout />} />
                <Route path="/admin/profile" element={<ManageProfile />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </SessionContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;