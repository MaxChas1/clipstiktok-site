// pages/api/jobs/index.js
import { randomUUID } from 'crypto';
import { putJob } from '../../../lib/store.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { videoUrl: videoUrlRaw, style, clips, quality } = req.body || {};
      const videoUrl = videoUrlRaw || '';

      if (!videoUrl || typeof videoUrl !== 'string') {
        return res.status(400).json({ error: 'videoUrl est requis (string).' });
      }

      const id = randomUUID();
      const now = new Date().toISOString();

      putJob({
        id,
        status: 'queued',
        input: {
          videoUrl,
          style: style || 'energetic',
          clips: Number(clips) || 1,
          quality: Number(quality) || 18,
        },
        result: null,
        createdAt: now,
        updatedAt: now,
      });

      return res.status(200).json({ id, status: 'queued' });
    } catch (err) {
      console.error('Erreur serveur /api/jobs:', err);
      return res.status(500).json({ error: 'Erreur interne', details: String(err) });
    }
  } else {
    // Important : on spécifie explicitement les méthodes autorisées
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
