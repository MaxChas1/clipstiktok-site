// pages/api/webhook.js
const { updateJob } = require('../../lib/store');

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || '';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const { id, status, result, secret } = req.body || {};

    if (!secret || secret !== WEBHOOK_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!id) return res.status(400).json({ error: 'id manquant' });

    const updated = updateJob(id, { status: status || 'done', result: result || null });
    if (!updated) return res.status(404).json({ error: 'job introuvable' });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('/api/webhook error:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
};
