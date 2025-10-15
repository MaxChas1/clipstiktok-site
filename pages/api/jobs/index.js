// pages/api/jobs/index.js
const { randomUUID } = require('crypto');
const { putJob, listJobs } = require('../../../lib/store');

const HF_WORKER_URL = process.env.HF_WORKER_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const SITE_URL = process.env.SITE_URL;

module.exports = async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { url, videoUrl: videoUrlRaw, style, clips, quality } = req.body || {};
      const videoUrl = url || videoUrlRaw;

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

      if (HF_WORKER_URL) {
        const callbackUrl = `${SITE_URL || `https://${req.headers.host}`}/api/webhook`;

        fetch(HF_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId: id,
            videoUrl,
            style: style || 'energetic',
            clips: Number(clips) || 1,
            quality: Number(quality) || 18,
            callbackUrl,
            secret: WEBHOOK_SECRET,
          }),
        }).catch(() => {});
      }

      return res.status(201).json({ id, status: 'queued' });
    } catch (e) {
      console.error('POST /api/jobs error:', e);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  if (req.method === 'GET') {
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
    return res.status(200).json({ jobs: listJobs(limit) });
  }

  return res.status(405).json({ error: 'Méthode non autorisée' });
};
