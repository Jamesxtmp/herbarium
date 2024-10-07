import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ognhpnlmvmxlyzqlyolv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nbmhwbmxtdm14bHl6cWx5b2x2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczODA5NzYsImV4cCI6MjA0Mjk1Njk3Nn0.bcI7gZsn5t9a9ciKs-mdFzpOAhPSZAEjvgkVXvUok8c"
);
