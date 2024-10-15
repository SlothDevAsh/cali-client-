import { IJob, JOB_STATUSES } from "@/interfaces/job.interface";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const JobCard: FC<IJob & { onPress: () => void }> = ({
  imageUrl,
  jobId,
  status,
  timestamp,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.5} onPress={onPress}>
      <Text style={styles.jobId}>Job ID: {jobId}</Text>
      <Text
        style={[
          styles.status,
          status === "RESOLVED"
            ? styles.resolved
            : status === "PENDING"
            ? styles.pending
            : styles.rejected,
        ]}
      >
        Status: {status}
      </Text>
      {status === "RESOLVED" && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  jobId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
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
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
