export const JOBS = new Map();

export function createJob({ input }) {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const job = {
    id,
    status: 'queued',
    input,
    result: null,
    error: null,
    createdAt: now,
    updatedAt: now,
  };
  JOBS.set(id, job);
  return job;
}

export function getJob(id) {
  return JOBS.get(id) || null;
}

export function updateJob(id, patch) {
  const job = JOBS.get(id);
  if (!job) return null;
  const updated = { ...job, ...patch, updatedAt: new Date().toISOString() };
  JOBS.set(id, updated);
  return updated;
}
