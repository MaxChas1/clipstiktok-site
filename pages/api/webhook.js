// pages/api/webhook.js
import { supabaseAdmin } from '../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { id, status, result, error: errMessage } = req.body || {};
    if (!id) return res.status(400).json({ error: 'id manquant' });

    const now = new Date().toISOString();
    const patch = { updated_at: now };

    if (status) patch.status = status;
    if (result !== undefined) patch.result = result;
    if (errMessage) patch.error = errMessage;

    const { data, error } = await supabaseAdmin
      .from('jobs')
      .update(patch)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Job introuvable' });

    return res.status(200).json({ ok: true, job: data });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
