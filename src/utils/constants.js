const JOB_TYPES = {
  TIME_CRITICAL: 'TIME_CRITICAL',
  NOT_TIME_CRITICAL: 'NOT_TIME_CRITICAL',
};

const jobTypes = Object.keys(JOB_TYPES);

const typeIsValid = (type) => {
  return jobTypes.includes(type);
};

const JOB_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  QUEUED: 'QUEUED',
  CONCLUDED: 'CONCLUDED',
};

const JOB_ERROR = {
  NOT_FOUND: 'JOB_NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  EMPTY_QUEUE: 'EMPTY_QUEUE',
  INVALID_JOB_TYPE: 'INVALID_JOB_TYPE',
  INVALID_JOB_ID: 'INVALID_JOB_ID',
};

module.exports = { JOB_STATUS, JOB_TYPES, typeIsValid, JOB_ERROR };
