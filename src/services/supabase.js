import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nnkvyrvvnsajaqqpftru.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ua3Z5cnZ2bnNhamFxcXBmdHJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4OTM0MDMsImV4cCI6MjAzNDQ2OTQwM30.FA3xCxZikA4_zfpM2nJtgqL9xUAe12REnIE5siLP6v0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
