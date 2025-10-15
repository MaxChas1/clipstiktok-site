// pages/api/jobs/[id].js
const { getJob } = require('../../../lib/store');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }
  const { id } = req.query || {};
  const job = getJob(id);
  if (!job) return res.status(404).json({ error: 'Job introuvable' });
  return res.status(200).json({ job });
};
