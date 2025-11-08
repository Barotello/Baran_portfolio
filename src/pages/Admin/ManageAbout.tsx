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
import { AboutSection } from "@/data/about";
import AboutSectionForm from "@/components/AboutSectionForm";
import { showSuccess, showError } from "@/utils/toast";

const ManageAbout: React.FC = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const navigate = useNavigate();
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutSection | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      navigate('/login');
    } else if (session) {
      fetchAboutSections();
    }
  }, [session, isSessionLoading, navigate]);

  const fetchAboutSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('about_sections')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      showError("Error fetching about sections: " + error.message);
    } else {
      setAboutSections(data || []);
    }
    setLoading(false);
  };

  const handleAddSection = () => {
    setEditingSection(undefined);
    setIsFormOpen(true);
  };

  const handleEditSection = (section: AboutSection) => {
    setEditingSection(section);
    setIsFormOpen(true);
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    const { error } = await supabase
      .from('about_sections')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Error deleting section: " + error.message);
    } else {
      showSuccess("Section deleted successfully!");
      fetchAboutSections();
    }
  };

  const handleFormSubmit = async (formData: AboutSection) => {
    setIsSubmitting(true);
    let error = null;

    if (editingSection) {
      // Update existing section
      const { error: updateError } = await supabase
        .from('about_sections')
        .update(formData)
        .eq('id', editingSection.id);
      error = updateError;
    } else {
      // Add new section
      const { error: insertError } = await supabase
        .from('about_sections')
        .insert({ ...formData, user_id: session?.user?.id });
      error = insertError;
    }

    if (error) {
      showError("Error saving section: " + error.message);
    } else {
      showSuccess("Section saved successfully!");
      setIsFormOpen(false);
      fetchAboutSections();
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
            Manage About Me
          </h1>
          <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl mx-auto mt-4">
            Add, edit, or delete sections of your About Me page.
          </p>
        </section>

        <section className="w-full py-8">
          <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddSection}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Section
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingSection ? "Edit About Section" : "Add New About Section"}</DialogTitle>
                </DialogHeader>
                <AboutSectionForm
                  initialData={editingSection}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsFormOpen(false)}
                  isSubmitting={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <p className="text-center">Loading sections...</p>
          ) : aboutSections.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No about sections found. Add your first section!</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aboutSections.map((section) => (
                    <TableRow key={section.id}>
                      <TableCell>{section.display_order}</TableCell>
                      <TableCell className="font-medium">{section.section_type}</TableCell>
                      <TableCell>{section.title}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditSection(section)}
                          className="mr-2"
                          aria-label="Edit Section"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteSection(section.id!)}
                          aria-label="Delete Section"
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

export default ManageAbout;