// pages/api/webhook.js
const { getJob, putJob } = require('../../lib/store');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const secret = req.headers['x-webhook-secret'] || req.headers['x-webhook-secret'.toLowerCase()];
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { jobId, status, result, error } = req.body || {};
    const job = getJob(jobId);
    if (!job) return res.status(404).json({ error: 'Job introuvable' });

    job.status = status || job.status;
    job.result = result || job.result;
    job.error = error || null;
    putJob(job);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Webhook error:', e);
    return res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};
