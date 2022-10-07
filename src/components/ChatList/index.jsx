import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ChatList({ data }) {
  return (
    <TouchableOpacity style={styles.chatRoom} activeOpacity={0.7}>
      <Text style={styles.name} numberOfLines={1}>
        {data?.name}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {data?.lastMessage.text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatRoom: {
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 10,
    shadowColor: "#A6A6A6",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { height: 3 },
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
    color: "#1b1b1b",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 20,
    color: "#999999",
  },
});
