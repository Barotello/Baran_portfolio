export interface AboutSection {
  id?: string;
  user_id?: string;
  section_type: 'summary' | 'experience' | 'education' | 'skill_category' | 'language' | 'certificate';
  title?: string; // Changed to optional
  job_title?: string; // New: For experience section's position
  company_name?: string; // New: For experience section's company name
  subtitle?: string; // For dates, location, or language proficiency
  description?: string; // For university name, summary text, or general details
  details?: string[]; // For experience bullet points, skill tags, certificate names
  display_order?: number;
  gpa?: string; // New field for GPA in education sections
  created_at?: string;
}

// Statik about verileri kaldırıldı. Veriler artık Supabase'den çekilecek.
export const aboutSections: AboutSection[] = [];