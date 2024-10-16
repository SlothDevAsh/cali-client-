import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import JobCard from "@/components/JobCard";
import { useCreateJob, useGetJobs } from "@/hooks/useJob";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { router } from "expo-router";
import { useSocket } from "@/services/socket";
import { IJob } from "@/interfaces/job.interface";
import Header from "@/components/Header";

const Home = () => {
  const { jobs: fetchedJobs, refetchJobs, isLoading, isError } = useGetJobs();

  const socket = useSocket();

  const [jobs, setJobs] = useState<IJob[]>(fetchedJobs || []);

  const [refreshing, setRefreshing] = useState(false);

  const { createJob, isCreating } = useCreateJob();

  const handleCreateJob = async () => {
    try {
      await createJob();
    } catch (error) {
      Alert.alert("Error", "Failed to create job");
    }
  };

  const handleCardPress = (id: string) => {
    router.push({
      // @ts-ignore
      pathname: "job-details",
      params: { jobId: id },
    });
  };

  useEffect(() => {
    if (socket) {
      // Listen for job status updates
      socket.on("jobStatusUpdate", (jobResult: IJob) => {
        // update the job using jobId

        setJobs((prevJobs) => {
          return prevJobs.map((job) =>
            job.jobId === jobResult.jobId ? { ...job, ...jobResult } : job
          );
        });
      });

      return () => {
        socket.off("jobStatusUpdate"); // Cleanup listener on unmount
      };
    }
  }, [socket]);

  // set jobs if fetchedJobs changes
  useEffect(() => {
    if (fetchedJobs) setJobs(fetchedJobs);
  }, [fetchedJobs]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchJobs();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.parent}>
      <Header title="Dish Dash" />
      {isLoading || isError ? (
        <Loader />
      ) : (
        <View style={styles.body}>
          <View style={styles.listContainer}>
            <FlatList
              data={jobs}
              keyExtractor={(item) => item.jobId}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              renderItem={({ item }) => (
                <JobCard
                  {...item}
                  onPress={() => {
                    handleCardPress(item.jobId);
                  }}
                />
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={handleCreateJob} loading={isCreating} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#f2f2f7",
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  body: {
    flex: 1,
    marginTop: 20,
  },
  listContainer: {
    flex: 0.9,
  },
  buttonContainer: {
    flex: 0.1,
  },
});
