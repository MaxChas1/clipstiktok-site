// pages/api/jobs/[id].js
import { supabaseAdmin } from '../../../lib/db.js';

export default async function handler(req, res) {
  const { id } = req.query || {};
  if (!id) return res.status(400).json({ error: 'id manquant' });

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('jobs')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Job introuvable' });

    return res.status(200).json(data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
