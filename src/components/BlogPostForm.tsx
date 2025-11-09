import React, { useState } from "react";
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
import ImageUploadField from "./ImageUploadField"; // Import the new component
import { uploadFile, deleteFile } from "@/integrations/supabase/storage"; // Import storage utilities
import { useSession } from "@/integrations/supabase/auth"; // To get user ID
import { showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const blogPostFormSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required." }),
  category: z.string().min(1, { message: "Category is required." }),
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Short Description is required." }),
  date: z.string().min(1, { message: "Date is required (e.g., 'October 26, 2023')." }),
  image_src: z.string().min(1, { message: "Image Source is required." }), // This will store the URL
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
  const { user } = useSession();
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleSubmit = async (values: z.infer<typeof blogPostFormSchema>) => {
    if (!user?.id) {
      showError("User not authenticated.");
      return;
    }

    setUploadingImage(true);
    let imageUrl = values.image_src;

    // If a new file is selected, upload it
    if (selectedImageFile) {
      // If there was an old image, try to delete it first
      if (initialData?.image_src && initialData.image_src.startsWith(supabase.storage.from('portfolio-images').getPublicUrl('').data.publicUrl)) {
        await deleteFile('portfolio-images', initialData.image_src);
      }
      const uploadedUrl = await uploadFile('portfolio-images', selectedImageFile, user.id);
      if (!uploadedUrl) {
        showError("Failed to upload image.");
        setUploadingImage(false);
        return;
      }
      imageUrl = uploadedUrl;
    } else if (!values.image_src && initialData?.image_src) {
      // If image was cleared and it was an existing Supabase image, delete it
      if (initialData.image_src.startsWith(supabase.storage.from('portfolio-images').getPublicUrl('').data.publicUrl)) {
        await deleteFile('portfolio-images', initialData.image_src);
      }
      imageUrl = ""; // Clear the image_src in the database
    }
    setUploadingImage(false);

    const formattedData: BlogPost = {
      ...values,
      image_src: imageUrl,
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
              <ImageUploadField
                label="Blog Post Image"
                value={field.value}
                onChange={(file, url) => {
                  setSelectedImageFile(file);
                  field.onChange(url); // Update form field with URL (or null if cleared)
                }}
                onClear={() => {
                  setSelectedImageFile(null);
                  field.onChange(""); // Clear the image_src field in the form
                }}
                disabled={isSubmitting || uploadingImage}
                error={form.formState.errors.image_src?.message}
              />
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
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting || uploadingImage}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || uploadingImage}>
            {isSubmitting || uploadingImage ? "Saving..." : "Save Blog Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostForm;