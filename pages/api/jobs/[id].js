const { getJob } = require('../../../lib/store');

module.exports = async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const job = getJob(id);
  if (!job) return res.status(404).json({ error: 'Job introuvable' });

  return res.status(200).json(job);
};
