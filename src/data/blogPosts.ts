export interface BlogPost {
  id?: string; // Supabase will generate this
  user_id?: string; // Supabase will link this to the authenticated user
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string; // Consider making this a Date object or ISO string for better handling
  image_src: string; // Renamed to match DB schema
  image_alt: string; // Renamed to match DB schema
  content: string; // Added for full blog post content
  created_at?: string; // Supabase will generate this
  author_name?: string; // New field for author's full name
}

// Statik blog yazıları dizisi kaldırıldı. Veriler artık Supabase'den çekilecek.
export const blogPosts: BlogPost[] = [];