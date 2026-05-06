import { createClient } from '@supabase/supabase-js';

// Reemplaza estos valores con los de tu proyecto en Supabase 
// (Settings -> API -> Project API keys / URL)
const supabaseUrl = 'https://hmqwlfmvupcnysvnidvm.supabase.co';
const supabaseKey = 'sb_publishable_ZyuFy8pyrsmvqrRnMqtJSQ_W_TyJHj7';

export const supabase = createClient(supabaseUrl, supabaseKey);