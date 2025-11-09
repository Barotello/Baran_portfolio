import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUploadField from "./ImageUploadField"; // Reusing the image upload component
import { uploadFile, deleteFile } from "@/integrations/supabase/storage";
import { useSession } from "@/integrations/supabase/auth";
import { showError } from "@/utils/toast";
import { supabase } from "@/integrations/supabase/client";

const profileFormSchema = z.object({
  first_name: z.string().optional().or(z.literal("")),
  last_name: z.string().optional().or(z.literal("")),
  avatar_url: z.string().optional().or(z.literal("")),
});

interface ProfileFormProps {
  initialData: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
  };
  onSubmit: (data: { first_name: string | null; last_name: string | null; avatar_url: string | null }) => void;
  isSubmitting: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting,
}) => {
  const { user } = useSession();
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      first_name: initialData.first_name || "",
      last_name: initialData.last_name || "",
      avatar_url: initialData.avatar_url || "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    if (!user?.id) {
      showError("User not authenticated.");
      return;
    }

    setUploadingAvatar(true);
    let avatarUrl = values.avatar_url;

    // If a new file is selected, upload it
    if (selectedAvatarFile) {
      // If there was an old avatar, try to delete it first
      if (initialData.avatar_url && initialData.avatar_url.startsWith(supabase.storage.from('portfolio-images').getPublicUrl('').data.publicUrl)) {
        await deleteFile('portfolio-images', initialData.avatar_url);
      }
      const uploadedUrl = await uploadFile('portfolio-images', selectedAvatarFile, user.id);
      if (!uploadedUrl) {
        showError("Failed to upload avatar.");
        setUploadingAvatar(false);
        return;
      }
      avatarUrl = uploadedUrl;
    } else if (!values.avatar_url && initialData.avatar_url) {
      // If avatar was cleared and it was an existing Supabase image, delete it
      if (initialData.avatar_url.startsWith(supabase.storage.from('portfolio-images').getPublicUrl('').data.publicUrl)) {
        await deleteFile('portfolio-images', initialData.avatar_url);
      }
      avatarUrl = ""; // Clear the avatar_url in the database
    }
    setUploadingAvatar(false);

    onSubmit({
      first_name: values.first_name || null,
      last_name: values.last_name || null,
      avatar_url: avatarUrl || null,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar_url"
          render={({ field }) => (
            <FormItem>
              <ImageUploadField
                label="Profile Avatar"
                value={field.value}
                onChange={(file, url) => {
                  setSelectedAvatarFile(file);
                  field.onChange(url); // Update form field with URL (or null if cleared)
                }}
                onClear={() => {
                  setSelectedAvatarFile(null);
                  field.onChange(""); // Clear the avatar_url field in the form
                }}
                disabled={isSubmitting || uploadingAvatar}
                error={form.formState.errors.avatar_url?.message}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting || uploadingAvatar}>
            {isSubmitting || uploadingAvatar ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;