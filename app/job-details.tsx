import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useGetJob } from "@/hooks/useJob";
import Loader from "@/components/Loader";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import JobCard from "@/components/JobCard";
import Error from "@/components/Error";

interface params {
  jobId: string;
}
const JobDetails = () => {
  const { jobId } = useLocalSearchParams() as unknown as params;
  const { job, isLoading, isError } = useGetJob(jobId);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Job Details" />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        job && (
          <View style={styles.cardContainer}>
            <JobCard {...job} />
          </View>
        )
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
