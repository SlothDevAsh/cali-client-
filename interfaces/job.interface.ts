export enum JOB_STATUSES {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export interface IJob {
  jobId: string;
  status: JOB_STATUSES;
  imageUrl: string;
  timestamp: string;
}

export interface CreateJobResponse {
  jobId: string;
}
