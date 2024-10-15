import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useGetJob } from "@/hooks/useJob"; // Adjust the import based on your hook's path
import { useRoute } from "@react-navigation/native"; // Assuming you're using React Navigation
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { JOB_STATUSES } from "@/interfaces/job.interface";

interface params {
  jobId: string;
}
const JobDetails = () => {
  const route = useRoute();

  const { jobId } = useLocalSearchParams() as unknown as params;
  const { job, isLoading, isError } = useGetJob(jobId);

  if (isLoading || isError) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {job && (
        <>
          <Text style={styles.title}>Job Details</Text>
          <Text style={styles.jobId}>Job ID: {job.jobId}</Text>
          <Text style={styles.status}>
            Status:{" "}
            <Text
              style={
                job.status === JOB_STATUSES.RESOLVED
                  ? styles.resolved
                  : job.status === JOB_STATUSES.PENDING
                  ? styles.pending
                  : styles.rejected
              }
            >
              {job.status}
            </Text>
          </Text>
          {job.status === "RESOLVED" && (
            <Image source={{ uri: job.imageUrl }} style={styles.image} />
          )}
          <Text style={styles.timestamp}>
            Last Updated:{" "}
            {new Date(job.timestamp).toLocaleTimeString("en-US", {
              weekday: "long",
              year: "numeric",
              //   month: "numeric",
              day: "numeric",
            })}
          </Text>
        </>
      )}
    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  jobId: {
    fontSize: 18,
    marginBottom: 10,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  resolved: {
    color: "green",
  },
  pending: {
    color: "orange",
  },
  rejected: {
    color: "red",
  },
  imageUrl: {
    fontSize: 16,
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 16,
    marginTop: 20,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
