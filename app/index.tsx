import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import JobCard from "@/components/JobCard";
import { useCreateJob, useGetJobs } from "@/hooks/useJob";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { router } from "expo-router";

const Home = () => {
  const { jobs, refetchJobs, isLoading, isError } = useGetJobs();
  const [refreshing, setRefreshing] = useState(false);

  const { createJob, isCreating } = useCreateJob();

  const handleCreateJob = async () => {
    try {
      await createJob();

      await refetchJobs();
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

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchJobs();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.parent}>
      {isLoading || isError ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#f2f2f7", // Light grey with a hint of blue
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  listContainer: { flex: 0.9 },
  buttonContainer: { flex: 0.1 },
});
