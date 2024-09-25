import { createClient } from "@supabase/supabase-js";

const supaUrl =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldGJ5cXdybGlodGJzaGp4bGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyMzQyMDQsImV4cCI6MjA0MjgxMDIwNH0.NfK53ZfjBgCiLkp681wKSz6Qy_7pCTdxQpjhMPo7s7M";
const supaAnonKey = "https://betbyqwrlihtbshjxlew.supabase.co";

export const supabase = createClient(supaUrl, supaAnonKey);
