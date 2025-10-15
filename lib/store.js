// lib/store.js
const jobs = new Map();

function putJob(job) {
  job.updatedAt = new Date().toISOString();
  jobs.set(job.id, job);
  return job;
}

function getJob(id) {
  return jobs.get(id) || null;
}

function listJobs(limit = 25) {
  return Array.from(jobs.values())
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

module.exports = { putJob, getJob, listJobs };
