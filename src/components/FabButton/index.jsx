import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function FabButton({ userStatus, setVisible }) {
  const navigation = useNavigation();

  function handleNavigation() {
    userStatus ? setVisible() : navigation.navigate("Auth");
  }

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.6}
      onPress={() => handleNavigation()}
    >
      <Entypo name="plus" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 40,
    right: 24,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#2E54D4",
  },
});
