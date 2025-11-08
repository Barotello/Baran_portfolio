import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rwcjegkeddpcxsacyqau.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Y2plZ2tlZGRwY3hzYWN5cWF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDQ2ODUsImV4cCI6MjA3ODE4MDY4NX0.JTRuY7YdcJCuw2foPBiUFi2DzE4APGksXkxcuCbeyPQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);