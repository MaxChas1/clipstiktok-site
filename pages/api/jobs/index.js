// pages/api/jobs/index.js
const { randomUUID } = require('crypto');
const { putJob, listJobs } = require('../../../lib/store');

const HF_WORKER_URL = process.env.HF_WORKER_URL || '';
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';
const SITE_URL = process.env.SITE_URL || '';

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Retourne la liste des jobs (pour vérifier que l’API marche)
      const jobs = listJobs(50);
      return res.status(200).json({ jobs });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    // POST: création d’un job
    const { videoUrl: videoUrlRaw, style, clips, quality } = req.body || {};
    const videoUrl = (videoUrlRaw || '').trim();

    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({ error: 'videoUrl est requis (string).' });
    }

    const id = randomUUID();
    const now = new Date().toISOString();

    putJob({
      id,
      status: 'queued',
      input: { videoUrl, style: style || 'energetic', clips: Number(clips) || 1, quality: Number(quality) || 18 },
      result: null,
      createdAt: now,
      updatedAt: now,
    });

    // Si un worker HF est configuré, on lui envoie le job (fire-and-forget)
    if (HF_WORKER_URL) {
      const callbackUrl = `${SITE_URL || `https://${req.headers.host}`}/api/webhook`;

      fetch(HF_WORKER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Secret': WEBHOOK_SECRET || '',
        },
        body: JSON.stringify({
          jobId: id,
          videoUrl,
          style: style || 'energetic',
          clips: Number(clips) || 1,
          quality: Number(quality) || 18,
          callbackUrl,
        }),
      }).catch(() => {
        // on ignore l’erreur réseau ici, le job reste en "queued"
      });
    }

    return res.status(201).json({ ok: true, jobId: id });
  } catch (err) {
    console.error('POST /api/jobs error:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
