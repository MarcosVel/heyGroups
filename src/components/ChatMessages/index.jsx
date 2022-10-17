import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Message({ data, user }) {
  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid;
  }, [data]);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage
              ? "rgba(209, 220, 255, 0.85);"
              : "#FFF",
            marginLeft: isMyMessage ? 48 : 0,
            marginRight: isMyMessage ? 0 : 48,
          },
        ]}
      >
        {!isMyMessage && !data.system && (
          <Text style={styles.name}>{data?.user?.displayName}</Text>
        )}
        <Text>{data.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  messageBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    borderRadius: 8,
  },
  name: {
    color: "#f53745",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
