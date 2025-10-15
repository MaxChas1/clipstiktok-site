// pages/api/jobs/index.js
const { randomUUID } = require('crypto');
const { putJob } = require('../../../lib/store');

const HF_WORKER_URL = process.env.HF_WORKER_URL;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
const SITE_URL = process.env.SITE_URL;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

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
      videoUrl,
      style: style || 'energetic',
      clips: Number(clips) || 1,
      quality: Number(quality) || 18,
      result: null,
      createdAt: now,
      updatedAt: now,
    });

    // Où le worker doit renvoyer le résultat
    const callbackUrl = `${SITE_URL || `https://${req.headers.host}`}/api/webhook`;

    // Optionnel: prévenir le worker si tu en as un
    if (HF_WORKER_URL) {
      try {
        await fetch(HF_WORKER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id,
            videoUrl,
            style: style || 'energetic',
            clips: Number(clips) || 1,
            quality: Number(quality) || 18,
            callbackUrl,
            secret: WEBHOOK_SECRET || '',
          }),
        });
      } catch (e) {
        console.error('Ping worker failed:', e);
      }
    }

    return res.status(200).json({ id, status: 'queued' });
  } catch (err) {
    console.error('/api/jobs error:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
};
