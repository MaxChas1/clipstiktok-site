// lib/store.js
// Petit store en mémoire (pas de base de données).
// Persiste tant que l'instance reste chaude. Suffisant pour tester.

if (!globalThis.__CLIPS_STORE__) {
  globalThis.__CLIPS_STORE__ = {
    jobs: new Map(), // id -> job
  };
}

function putJob(job) {
  __CLIPS_STORE__.jobs.set(job.id, job);
  return job;
}

function getJob(id) {
  return __CLIPS_STORE__.jobs.get(id) || null;
}

function listJobs() {
  return Array.from(__CLIPS_STORE__.jobs.values());
}

function updateJob(id, patch) {
  const current = __CLIPS_STORE__.jobs.get(id);
  if (!current) return null;
  const updated = { ...current, ...patch, updatedAt: new Date().toISOString() };
  __CLIPS_STORE__.jobs.set(id, updated);
  return updated;
}

module.exports = { putJob, getJob, listJobs, updateJob };
