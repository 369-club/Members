import { createClient } from "@supabase/supabase-js";

// Supabase URL and anonymous key from your backend API setup
const supabaseUrl = "https://zbhphppspfxycsmwlwcg.supabase.co/";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaHBocHBzcGZ4eWNzbXdsd2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4Njk0NTksImV4cCI6MjA0OTQ0NTQ1OX0.TKCUxBzs1OfVU3PESjSKunJcumOq0JgkmxV5ou5fGNY";

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
