import { getJob } from '../_store';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { id } = req.query;
    const job = getJob(id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    return res.status(200).json({
      jobId: job.id,
      status: job.status,
      result: job.result,
      error: job.error,
      updatedAt: job.updatedAt,
      createdAt: job.createdAt,
    });
  } catch (err) {
    console.error('GET /api/jobs/[id] error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
