# in-memory-job-queue


The queue supports the following operations:

### `/jobs/enqueue`
Add a job to the queue. The job definition can be found below.
Returns the ID of the job

### `/jobs/dequeue`
Returns a job from the queue
Jobs are considered available for Dequeue if the job has not been concluded and has not dequeued already

### `/jobs/{job_id}/conclude`
Provided an input of a job ID, finish execution on the job and consider it done

### `/jobs/{job_id}`
Given an input of a job ID, get information about a job tracked by the queue


The lifecycle of requests made for a job might look like this:

`/jobs/enqueue -> /jobs/dequeue -> /jobs/{job_id}/conclude`

A job has the following attributes as part of its public API:

### `ID`: an integer to uniquely represent a job
The ID is assigned to a job by the queue once the job is enqueued

### `Type`: a string representing the class of operation
There are two types: `TIME_CRITICAL` and `NOT_TIME_CRITICAL`. Type is sent from the producer when a job is enqueued. 
The Type is not considered by dequeue’s business logic.

### `Status`: an enum value indicating the current stage of the jobs’ execution.

There are 3 statuses: `QUEUED`, `IN_PROGRESS`, `CONCLUDED`

An example job returned from `jobs/{job_id}` looks like:

```
{
 "ID": 951,
 "Type": "TIME_CRITICAL",
 "Status": "IN_PROGRESS"
}
```
