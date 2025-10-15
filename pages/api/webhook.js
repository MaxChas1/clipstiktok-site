// pages/api/webhook.js
const { getJob, putJob } = require('../../lib/store');

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const secret = req.headers['x-webhook-secret'];
    if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Non autorisé' });
    }

    const { jobId, status, progress, resultUrl, error } = req.body || {};
    if (!jobId) return res.status(400).json({ error: 'jobId requis.' });

    const existing = getJob(jobId);
    if (!existing) return res.status(404).json({ error: 'Job inconnu.' });

    const next = {
      ...existing,
      status: status || existing.status,
      result: resultUrl ? { url: resultUrl } : existing.result,
      progress: typeof progress === 'number' ? progress : existing.progress,
      error: error || undefined,
    };

    putJob(next);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Webhook error:', e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};
