const c = require('./utils/constants');
const errorHandler = require('./utils/errorHandler');
const helpers = require('./utils/helpers');

let nextAvailableId = 0;

// I assumed that for in-memory it is enough to have it like this, not e.g. as real files in memory
const queue = [];
const inProgress = [];
const handledQueue = [];

const enqueueHandler = (req, res) => {
  try {
    if (!req.body || !req.body.Type || !c.typeIsValid(req.body.Type)) {
      throw new Error(c.JOB_ERROR.INVALID_JOB_TYPE);
    }
    nextAvailableId++;

    queue.push({
      ID: nextAvailableId,
      Type: req.body.Type,
      Status: c.JOB_STATUS.QUEUED,
    });

    res.json({ ID: nextAvailableId });
  } catch (error) {
    errorHandler.handle(error, res);
  }
};

const dequeueHandler = (_req, res) => {
  try {
    if (queue.length === 0) throw new Error(c.JOB_ERROR.EMPTY_QUEUE);

    const next = queue.shift();
    next.Status = c.JOB_STATUS.IN_PROGRESS;
    inProgress.push(next);

    res.json(next);
  } catch (error) {
    errorHandler.handle(error, res);
  }
};

const concludeHandler = (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) throw new Error(c.JOB_ERROR.INVALID_JOB_ID);

    let { id, job } = helpers.findJobAndItsIndexFromQueue(queue, jobId);
    if (id === -1) {
      const progress = helpers.findJobAndItsIndexFromQueue(inProgress, jobId);
      id = progress.id;
      job = progress.job;
    }
    if (id === -1) throw new Error(c.JOB_ERROR.NOT_FOUND);

    let tempStatus = job.Status;
    job.Status = c.JOB_STATUS.CONCLUDED;
    helpers.moveToHandledQ(
      tempStatus === c.JOB_STATUS.QUEUED ? queue : inProgress,
      handledQueue,
      id,
      job
    );

    res.json(job);
  } catch (error) {
    errorHandler.handle(error, res);
  }
};

const getJobByIdHandler = (req, res) => {
  try {
    const jobId = req.params.id;

    let { job } = helpers.findJobAndItsIndexFromQueue(queue, jobId);
    if (!job) {
      const progress = helpers.findJobAndItsIndexFromQueue(inProgress, jobId);
      job = progress.job;
    }
    if (!job) {
      const handled = helpers.findJobAndItsIndexFromQueue(handledQueue, jobId);
      job = handled.job;
    }
    if (!job) throw new Error(c.JOB_ERROR.NOT_FOUND);

    res.json(job);
  } catch (error) {
    errorHandler.handle(error, res);
  }
};

const setupRoutes = (app) => {
  app.post('/jobs/enqueue', enqueueHandler);
  app.get('/jobs/dequeue', dequeueHandler);
  app.get('/jobs/:id/conclude', concludeHandler);
  app.get('/jobs/:id', getJobByIdHandler);
};

module.exports = { setupRoutes };
