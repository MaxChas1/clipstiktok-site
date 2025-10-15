import { updateJob } from './_store';

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['x-webhook-signature'];
  if (!process.env.WEBHOOK_SECRET || sig !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { jobId, status, result, error } = body;
    if (!jobId) return res.status(400).json({ error: 'jobId manquant' });

    if (status === 'completed') updateJob(jobId, { status, result, error: null });
    else if (status === 'failed') updateJob(jobId, { status, error: error || 'unknown error', result: null });
    else if (status === 'processing') updateJob(jobId, { status });
    else return res.status(400).json({ error: 'status invalide' });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('POST /api/webhook error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
