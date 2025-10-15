// pages/api/jobs/[id].js
const { getJob } = require('../../../lib/store');

module.exports = async function handler(req, res) {
  const { id } = req.query || {};

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const job = getJob(id);
    if (!job) return res.status(404).json({ error: 'job introuvable' });
    return res.status(200).json(job);
  } catch (err) {
    console.error('/api/jobs/[id] error:', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
};
