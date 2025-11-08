import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/integrations/supabase/auth";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Project } from "@/data/projects";
import ProjectForm from "@/components/ProjectForm";
import { showSuccess, showError } from "@/utils/toast";

const ManageProjects: React.FC = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      navigate('/login');
    } else if (session) {
      fetchProjects();
    }
  }, [session, isSessionLoading, navigate]);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showError("Error fetching projects: " + error.message);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleAddProject = () => {
    setEditingProject(undefined);
    setIsFormOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Error deleting project: " + error.message);
    } else {
      showSuccess("Project deleted successfully!");
      fetchProjects();
    }
  };

  const handleFormSubmit = async (formData: Project) => {
    setIsSubmitting(true);
    let error = null;

    if (editingProject) {
      // Update existing project
      const { error: updateError } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', editingProject.id);
      error = updateError;
    } else {
      // Add new project
      const { error: insertError } = await supabase
        .from('projects')
        .insert({ ...formData, user_id: session?.user?.id });
      error = insertError;
    }

    if (error) {
      showError("Error saving project: " + error.message);
    } else {
      showSuccess("Project saved successfully!");
      setIsFormOpen(false);
      fetchProjects();
    }
    setIsSubmitting(false);
  };

  if (isSessionLoading || !session) {
    return (
      <Layout>
        <Header />
        <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
          <p>Loading authentication...</p>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 sm:pt-24 lg:pt-32 min-h-[60vh]">
        <section className="w-full text-center mb-12">
          <h1 className="text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Manage Projects
          </h1>
          <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl mx-auto mt-4">
            Add, edit, or delete your portfolio projects.
          </p>
        </section>

        <section className="w-full py-8">
          <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddProject}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                </DialogHeader>
                <ProjectForm
                  initialData={editingProject}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsFormOpen(false)}
                  isSubmitting={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <p className="text-center">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No projects found. Add your first project!</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.tags}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProject(project)}
                          className="mr-2"
                          aria-label="Edit Project"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProject(project.id!)}
                          aria-label="Delete Project"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </Layout>
  );
};

export default ManageProjects;