// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://akbuapqbxcqvysmojkcs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYnVhcHFieGNxdnlzbW9qa2NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTYwODAsImV4cCI6MjA1NDYzMjA4MH0.7HlN0Bta04WowGDvTb-5l6TIkfvBtzOnhRo1IvTSCLo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);