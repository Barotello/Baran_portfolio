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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AboutSection } from "@/data/about";

const aboutSectionFormSchema = z.object({
  section_type: z.enum(['summary', 'experience', 'education', 'skill_category', 'language', 'certificate'], {
    required_error: "Section type is required.",
  }),
  title: z.string().min(1, { message: "Title is required." }),
  subtitle: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  details: z.string().optional().or(z.literal("")), // Comma-separated string for array conversion
  display_order: z.coerce.number().min(0, { message: "Display order must be a non-negative number." }),
  gpa: z.string().optional().or(z.literal("")), // GPA is optional by default
}).superRefine((data, ctx) => {
  if (data.section_type === 'education' && !data.gpa) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "GPA is required for education sections.",
      path: ['gpa'],
    });
  }
});

interface AboutSectionFormProps {
  initialData?: AboutSection;
  onSubmit: (data: AboutSection) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

const AboutSectionForm: React.FC<AboutSectionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const form = useForm<z.infer<typeof aboutSectionFormSchema>>({
    resolver: zodResolver(aboutSectionFormSchema),
    defaultValues: {
      section_type: initialData?.section_type || 'summary',
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      description: initialData?.description || "",
      details: initialData?.details?.join(", ") || "",
      display_order: initialData?.display_order || 0,
      gpa: initialData?.gpa || "", // Set default value for GPA
    },
  });

  const selectedSectionType = form.watch("section_type");

  const handleSubmit = (values: z.infer<typeof aboutSectionFormSchema>) => {
    const formattedData: AboutSection = {
      ...values,
      details: values.details ? values.details.split(",").map((s) => s.trim()).filter(Boolean) : [],
    };
    onSubmit(formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="section_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a section type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="summary">Professional Summary</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="skill_category">Skill Category</SelectItem>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 0, 1, 2 (lower numbers appear first)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (e.g., Department, Company, Skill Category)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., System & Network Engineer, ASELSAN, METU" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(selectedSectionType === 'experience' || selectedSectionType === 'education' || selectedSectionType === 'language') && (
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle (e.g., Dates, Location, Proficiency)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 07/2023 - Present, Ankara, Turkey, Native" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(selectedSectionType === 'summary' || selectedSectionType === 'education') && (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (e.g., University Name, Summary Text)</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., Middle East Technical University, Detailed summary for this section" rows={5} {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        )}

        {selectedSectionType === 'education' && (
          <FormField
            control={form.control}
            name="gpa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPA</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3.63" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(selectedSectionType === 'experience' || selectedSectionType === 'skill_category' || selectedSectionType === 'certificate') && (
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Details (Comma-separated list)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      selectedSectionType === 'experience'
                        ? "e.g., Charged with building..., Utilized various diagramming tools..."
                        : selectedSectionType === 'skill_category'
                        ? "e.g., Network Topology, Network Security, Cloud Services"
                        : "e.g., Google UX Design (8 courses), Foundations: Data, Data, Everywhere. (Each certificate on a new line or separated by commas)"
                    }
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Section"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AboutSectionForm;