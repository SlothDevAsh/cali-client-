import { http } from "@/config/axios.config";
import { CreateJobResponse, IJob } from "@/interfaces/job.interface";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useGetJobs = () => {
  const { data, error, isMutating, reset, trigger } = useSWRMutation(
    "/jobs",
    async (url) => {
      const response = await http.get<IJob[]>("/jobs");

      return response.data;
    }
  );

  return {
    jobs: data,
    isLoading: isMutating,
    isError: error,
    trigger,
  };
};

export const useGetJob = (jobId: string) => {
  const { data, error, isLoading, mutate } = useSWR<IJob>(
    jobId ? `/jobs/${jobId}` : null,
    async (url: string) => {
      const response = await http.get<IJob>(url);
      return response.data;
    }
  );

  return {
    job: data,
    isLoading,
    isError: !!error,
    refetchJobs: mutate,
  };
};

export const useCreateJob = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    "/jobs",
    async (url) => {
      return http.post<CreateJobResponse>(url);
    }
  );

  return {
    createJob: trigger,
    isCreating: isMutating,
    isError: !!error,
  };
};
