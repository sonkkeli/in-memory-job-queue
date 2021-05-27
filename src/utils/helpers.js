const findJobAndItsIndexFromQueue = (q, jobId) => {
  let i = 0;
  let idx = -1;

  const jobs = q.filter((a) => {
    i++;
    if (a.ID == jobId) {
      idx = i - 1;
      return true;
    } else return false;
  });

  return { id: idx, job: jobs.length === 1 ? jobs[0] : null };
};

const moveToHandledQ = (q, handledQueue, idInQueue, job) => {
  q.splice(idInQueue, 1);
  handledQueue.push(job);
};

module.exports = { findJobAndItsIndexFromQueue, moveToHandledQ };
