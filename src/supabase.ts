import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ayzlovxcimmqmyudqwfp.supabase.co';
const supabaseKey = 'sb_publishable_AR_oL99i9WbCJu8Lgri3jA_NrY3etfq';

export const supabase = createClient(supabaseUrl, supabaseKey);
