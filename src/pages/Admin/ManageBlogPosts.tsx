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
import { BlogPost } from "@/data/blogPosts";
import BlogPostForm from "@/components/BlogPostForm";
import { showSuccess, showError } from "@/utils/toast";

const ManageBlogPosts: React.FC = () => {
  const { session, isLoading: isSessionLoading } = useSession();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPost | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isSessionLoading && !session) {
      navigate('/login');
    } else if (session) {
      fetchBlogPosts();
    }
  }, [session, isSessionLoading, navigate]);

  const fetchBlogPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showError("Error fetching blog posts: " + error.message);
    } else {
      setBlogPosts(data || []);
    }
    setLoading(false);
  };

  const handleAddBlogPost = () => {
    setEditingBlogPost(undefined);
    setIsFormOpen(true);
  };

  const handleEditBlogPost = (blogPost: BlogPost) => {
    setEditingBlogPost(blogPost);
    setIsFormOpen(true);
  };

  const handleDeleteBlogPost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      showError("Error deleting blog post: " + error.message);
    } else {
      showSuccess("Blog post deleted successfully!");
      fetchBlogPosts();
    }
  };

  const handleFormSubmit = async (formData: BlogPost) => {
    setIsSubmitting(true);
    let error = null;

    if (editingBlogPost) {
      // Update existing blog post
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(formData)
        .eq('id', editingBlogPost.id);
      error = updateError;
    } else {
      // Add new blog post
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({ ...formData, user_id: session?.user?.id });
      error = insertError;
    }

    if (error) {
      showError("Error saving blog post: " + error.message);
    } else {
      showSuccess("Blog post saved successfully!");
      setIsFormOpen(false);
      fetchBlogPosts();
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
            Manage Blog Posts
          </h1>
          <p className="text-lg font-normal text-stone-600 dark:text-stone-300 md:text-xl max-w-3xl mx-auto mt-4">
            Add, edit, or delete your journal entries.
          </p>
        </section>

        <section className="w-full py-8">
          <div className="flex justify-end mb-4">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleAddBlogPost}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add New Blog Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingBlogPost ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                </DialogHeader>
                <BlogPostForm
                  initialData={editingBlogPost}
                  onSubmit={handleFormSubmit}
                  onCancel={() => setIsFormOpen(false)}
                  isSubmitting={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <p className="text-center">Loading blog posts...</p>
          ) : blogPosts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">No blog posts found. Add your first entry!</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditBlogPost(post)}
                          className="mr-2"
                          aria-label="Edit Blog Post"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteBlogPost(post.id!)}
                          aria-label="Delete Blog Post"
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

export default ManageBlogPosts;