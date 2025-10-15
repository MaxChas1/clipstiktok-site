// pages/api/jobs/[id].js
import { getJob } from '../../../lib/store.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { id } = req.query;
  const job = getJob(id);

  if (!job) {
    return res.status(404).json({ error: 'Job introuvable' });
  }

  return res.status(200).json(job);
}
