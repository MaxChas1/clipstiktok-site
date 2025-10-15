// pages/api/webhook.js
import { updateJob, getJob } from '../../lib/store.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { id, status, result, error } = req.body || {};
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'id est requis (string).' });
  }
  if (!getJob(id)) {
    return res.status(404).json({ error: 'Job introuvable' });
  }

  const patch = {
    status: status || 'done',
    result: result ?? null,
    error: error ?? null,
    updatedAt: new Date().toISOString(),
  };

  const updated = updateJob(id, patch);
  return res.status(200).json({ ok: true, job: updated });
}
