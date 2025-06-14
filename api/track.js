import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { visitorId } = req.body;
  if (!visitorId) return res.status(400).json({ error: "Missing visitorId" });

  const { data: existing } = await supabase
    .from('visitors')
    .select('id')
    .eq('visitor_id', visitorId)
    .single();

  if (existing) return res.status(200).json({ message: 'Already counted' });

  await supabase.from('visitors').insert([{ visitor_id: visitorId }]);
  return res.status(201).json({ message: 'New visitor counted' });
}
