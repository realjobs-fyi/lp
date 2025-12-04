import { createClient } from "@supabase/supabase-js";

/**
 * Create a Supabase client for the client
 * @returns The Supabase client
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
        persistSession: true,
        detectSessionInUrl: true,
    }
  }
);