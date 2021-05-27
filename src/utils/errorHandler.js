const c = require('./constants');

const handle = (error, res) => {
  console.error(error); // some kind of logging of errors should be in place

  if (error.message === c.JOB_ERROR.EMPTY_QUEUE || error.message === c.JOB_ERROR.NOT_FOUND) {
    res.sendStatus(404);
    return;
  }
  if (
    error.message === c.JOB_ERROR.INVALID_JOB_ID ||
    error.message === c.JOB_ERROR.INVALID_JOB_TYPE
  ) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(500);
};

module.exports = { handle };
