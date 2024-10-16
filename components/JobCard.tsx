import { IJob, JOB_STATUSES } from "@/interfaces/job.interface";
import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const JobCard: FC<IJob & { onPress?: () => void }> = ({
  imageUrl,
  jobId,
  status,
  timestamp,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.5} onPress={onPress}>
      <Text style={styles.jobIdKey}>Job ID:</Text>
      <Text style={styles.jobIdValue}>{jobId}</Text>
      {status === "RESOLVED" && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}

      <View style={styles.statusContainer}>
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
      </View>

      <Text style={styles.timestamp}>
        Last Updated:{" "}
        {new Date(timestamp).toLocaleTimeString("en-US", {
          weekday: "long",
          year: "numeric",
          //   month: "numeric",
          day: "numeric",
        })}
      </Text>
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
    elevation: 5,
  },
  jobIdKey: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  jobIdValue: {
    fontSize: 15,
    marginBottom: 5,
  },
  statusContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
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

  timestamp: {
    fontSize: 16,
    marginTop: 20,
    color: "#555",
  },
});
