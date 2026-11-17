/**
 * Supabase client factory.
 *
 * Not wired up yet: this environment has no Supabase project credentials.
 * Once you create a project and run schema.sql against it:
 *
 *   1. npm install @supabase/supabase-js @supabase/ssr
 *   2. Copy .env.example to .env.local and fill in the real values
 *   3. Replace the repository functions in lib/repository/websites.ts and
 *      the localStorage-backed stores in lib/store/* with calls through
 *      the client(s) this file exports — the function signatures were
 *      deliberately kept async and return-shape-compatible so that swap
 *      is mechanical, not a rewrite.
 *
 * Until then, `isSupabaseConfigured()` is false and the app runs on the
 * seed data + localStorage stores instead.
 */

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Example of what this becomes once the package above is installed:
//
// import { createBrowserClient } from '@supabase/ssr';
//
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   );
// }
