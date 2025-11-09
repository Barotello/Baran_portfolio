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
import { BlogPost } from "@/data/blogPosts";

const blogPostFormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Short Description is required." }),
  date: z.string().min(1, { message: "Date is required (e.g., 'October 26, 2023')." }),
  image_src: z.string().min(1, { message: "Image Source is required." }),
  image_alt: z.string().min(1, { message: "Image Alt Text is required." }),
  content: z.string().min(1, { message: "Content is required." }),
});

interface BlogPostFormProps {
  initialData?: BlogPost;
  onSubmit: (data: BlogPost) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const BlogPostForm: React.FC<BlogPostFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const form = useForm<z.infer<typeof blogPostFormSchema>>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      slug: initialData?.slug || "",
      category: initialData?.category || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      date: initialData?.date || "",
      image_src: initialData?.image_src || "",
      image_alt: initialData?.image_alt || "",
      content: initialData?.content || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof blogPostFormSchema>) => {
    onSubmit(values);
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
                <Input placeholder="Blog Post Title" {...field} />
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
                <Input placeholder="e.g., my-awesome-blog-post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., UI/UX, Development, Case Study" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input placeholder="e.g., October 26, 2023" {...field} />
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
              <FormLabel>Image Source URL or Local Path</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg or /images/my-image.jpg" {...field} />
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
                <Textarea placeholder="A brief overview of the blog post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Full content of the blog post" rows={10} {...field} />
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
            {isSubmitting ? "Saving..." : "Save Blog Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;