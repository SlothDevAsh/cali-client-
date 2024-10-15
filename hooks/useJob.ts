import { http } from "@/config/axios.config";
import { CreateJobResponse, IJob } from "@/interfaces/job.interface";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useGetJobs = () => {
  const { data, error, isLoading, mutate } = useSWR<IJob[]>(
    "/jobs",
    async () => {
      const response = await http.get("/jobs");
      return response.data;
    }
  );

  return {
    jobs: data,
    isLoading,
    isError: error,
    refetchJobs: () =>
      mutate(undefined, {
        revalidate: true,
      }),
  };
};

export const useGetJob = (jobId: string) => {
  const { data, error, isLoading, mutate } = useSWR<IJob>(
    jobId ? `/jobs/${jobId}` : null,
    async (url: string) => {
      const response = await http.get(url);
      return response.data;
    },
    {
      refreshInterval: 5000, // Refresh every 5 seconds to get an update of job's status
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
