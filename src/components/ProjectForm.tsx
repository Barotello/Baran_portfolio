import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Project } from "@/data/projects";

const projectFormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required." }),
  image_src: z.string().url({ message: "Image Source must be a valid URL." }),
  image_alt: z.string().min(1, { message: "Image Alt Text is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  tags: z.string().min(1, { message: "Tags are required (comma-separated)." }),
  overview: z.string().min(1, { message: "Overview is required." }),
  problem: z.string().min(1, { message: "Problem description is required." }),
  solution: z.string().min(1, { message: "Solution description is required." }),
  role: z.string().min(1, { message: "Role is required (comma-separated)." }),
  technologies: z.string().min(1, { message: "Technologies are required (comma-separated)." }),
  live_website_link: z.string().url({ message: "Live Website Link must be a valid URL." }).optional().or(z.literal("")),
  github_repo_link: z.string().url({ message: "GitHub Repo Link must be a valid URL." }).optional().or(z.literal("")),
  next_project_slug: z.string().optional().or(z.literal("")),
});

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Project) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      slug: initialData?.slug || "",
      image_src: initialData?.image_src || "",
      image_alt: initialData?.image_alt || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      tags: initialData?.tags || "",
      overview: initialData?.overview || "",
      problem: initialData?.problem || "",
      solution: initialData?.solution || "",
      role: initialData?.role?.join(", ") || "",
      technologies: initialData?.technologies?.join(", ") || "",
      live_website_link: initialData?.live_website_link || "",
      github_repo_link: initialData?.github_repo_link || "",
      next_project_slug: initialData?.next_project_slug || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof projectFormSchema>) => {
    const formattedData: Project = {
      ...values,
      role: values.role.split(",").map((s) => s.trim()).filter(Boolean),
      technologies: values.technologies.split(",").map((s) => s.trim()).filter(Boolean),
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (Unique URL identifier)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., my-awesome-project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_src"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Source URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image_alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Alt Text</FormLabel>
              <FormControl>
                <Input placeholder="Description of the image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief overview of the project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UI/UX Design, Web Development" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overview</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed project overview" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="problem"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Problem</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the problem the project solved" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="solution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Solution</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the solution implemented" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>My Role (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Lead UI/UX Designer, Front-End Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies Used (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Figma, React, Tailwind CSS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="live_website_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Website Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://live-site.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_repo_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub Repo Link (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/user/repo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="next_project_slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Project Slug (Optional, for linking case studies)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., mobile-banking-app" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;