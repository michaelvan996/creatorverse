import { createClient } from '@supabase/supabase-js';

const URL = "https://rfiyywvxdwihwtzqzirp.supabase.co"
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmaXl5d3Z4ZHdpaHd0enF6aXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxNTUxNzAsImV4cCI6MjAwODczMTE3MH0.yr9wXirJs1sHlpJh30LLCpbDFo-rXD6giG-P7IgSKWg"

export const supabase = createClient(URL, API_KEY);
