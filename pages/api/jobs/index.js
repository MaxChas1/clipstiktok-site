import { createJob } from '../_store';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { videoUrl, style = 'Energetique', crf = 18, clipsCount = 1 } = body;

    if (!videoUrl || typeof videoUrl !== 'string') {
      return res.status(400).json({ error: 'videoUrl est requis (string).' });
    }

    const job = createJob({ input: { videoUrl, style, crf, clipsCount } });

    return res.status(201).json({
      jobId: job.id,
      status: job.status,
      message: 'Job créé et en file d’attente.',
    });
  } catch (err) {
    console.error('POST /api/jobs error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
