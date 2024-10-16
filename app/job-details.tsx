import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useGetJob } from "@/hooks/useJob";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import { JOB_STATUSES } from "@/interfaces/job.interface";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import JobCard from "@/components/JobCard";

interface params {
  jobId: string;
}
const JobDetails = () => {
  const { jobId } = useLocalSearchParams() as unknown as params;
  const { job, isLoading, isError } = useGetJob(jobId);

  if (isLoading || isError) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Job Details" />
      {job && (
        <View style={styles.cardContainer}>
          <JobCard {...job} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  cardContainer: {
    marginTop: 20,
  },
});
