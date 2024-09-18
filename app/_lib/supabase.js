import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://dbbbnrlvmafwefgzwgpp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiYmJucmx2bWFmd2VmZ3p3Z3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3MzE4NTMsImV4cCI6MjAyOTMwNzg1M30.Yd8SpsUFpCk7zx-e48Ka3G3txp1ViLCcoJwjOabD0Gw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
