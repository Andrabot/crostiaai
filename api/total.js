import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { count } = await supabase
    .from('visitors')
    .select('*', { count: 'exact', head: true });

  res.status(200).json({ total: count });
}
