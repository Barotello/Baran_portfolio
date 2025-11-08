export interface AboutSection {
  id?: string;
  user_id?: string;
  section_type: 'summary' | 'experience' | 'education' | 'skill_category' | 'language' | 'certificate';
  title: string;
  subtitle?: string; // For dates, company names, or language proficiency
  description?: string; // For summary, general text, or education details
  details?: string[]; // For experience bullet points, skill tags, certificate names
  display_order?: number;
  created_at?: string;
}

// Statik about verileri kaldırıldı. Veriler artık Supabase'den çekilecek.
export const aboutSections: AboutSection[] = [];