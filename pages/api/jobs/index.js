// pages/api/jobs/index.js
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '../../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { videoUrl, style = 'energetic', clips = 1, quality = 18 } = req.body || {};

    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({ error: 'videoUrl est requis (string).' });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin
      .from('jobs')
      .insert({
        id,
        status: 'queued',
        video_url: videoUrl,
        style,
        clips,
        quality,
        created_at: now,
        updated_at: now
      });

    if (error) throw error;

    // (Optionnel) Ici, tu appelleras + tard ton worker HF, puis le worker appellera /api/webhook
    return res.status(200).json({ id, status: 'queued' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
