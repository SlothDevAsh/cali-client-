import { Colors } from "@/constants/Colors";
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
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.jobIdKey}>Job ID:</Text>
      <Text style={styles.jobIdValue}>{jobId}</Text>
      {status === JOB_STATUSES.RESOLVED && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}

      <View style={styles.statusContainer}>
        <Text style={[styles.status]}>
          Status:{" "}
          <Text
            style={[
              styles.statusValue,
              status === JOB_STATUSES.RESOLVED
                ? styles.resolved
                : status === JOB_STATUSES.PENDING
                ? styles.pending
                : styles.rejected,
            ]}
          >
            {" "}
            {status}
          </Text>
        </Text>
      </View>

      <Text style={styles.timestamp}>
        Last Updated At:{" "}
        {new Date(timestamp).toLocaleTimeString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
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
    color: Colors.text,
  },
  jobIdValue: {
    fontSize: 15,
    marginBottom: 5,
    color: Colors.text,
  },
  statusContainer: {
    paddingTop: 10,
    alignItems: "flex-end",
  },
  status: {
    fontSize: 16,
    marginBottom: 10,
    color: Colors.text,
  },

  statusValue: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  resolved: {
    color: Colors.statusResolved,
  },
  pending: {
    color: Colors.statusPending,
  },
  rejected: {
    color: Colors.statusRejected,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },

  timestamp: {
    fontSize: 13,
    marginTop: 20,
    color: Colors.text,
    fontStyle: "italic",
  },
});
