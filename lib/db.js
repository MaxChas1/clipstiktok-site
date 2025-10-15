// lib/db.js
import { createClient } from '@supabase/supabase-js';

// Ces 2 variables DOIVENT exister dans Vercel > Settings > Environment Variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

// Client admin (service role) - usage SERVEUR uniquement
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole, {
  auth: { persistSession: false }
});
