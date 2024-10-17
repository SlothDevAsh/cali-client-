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
import Error from "@/components/Error";
import EmptyList from "@/components/EmptyList";

const Home = () => {
  const { jobs: fetchedJobs, trigger, isLoading, isError } = useGetJobs();

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
        setJobs((prevJobs) => {
          // Check if the job already exists
          const jobExists = prevJobs.some(
            (job) => job.jobId === jobResult.jobId
          );

          if (jobExists) {
            // Update existing job
            return prevJobs.map((job) =>
              job.jobId === jobResult.jobId ? { ...job, ...jobResult } : job
            );
          } else {
            // Add new job
            return [jobResult, ...prevJobs];
          }
        });
      });

      return () => {
        socket.off("jobStatusUpdate"); // Cleanup listener on unmount
      };
    }
  }, [socket]);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const data = await trigger();

      if (data) setJobs(data);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };

  // Trigger the initial fetch on component mount
  useEffect(() => {
    const fetchInitialJobs = async () => {
      const data = await trigger();
      if (data) setJobs(data);
    };

    fetchInitialJobs();
  }, [trigger]);

  return (
    <SafeAreaView style={styles.parent}>
      <Header title="Dish Dash" />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        <View style={styles.body}>
          {jobs.length > 0 ? (
            <View style={styles.listContainer}>
              <FlatList
                data={jobs}
                keyExtractor={(item) => item.jobId}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
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
          ) : (
            <EmptyList />
          )}

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
