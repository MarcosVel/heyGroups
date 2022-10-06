import React from "react";
import { Platform, StatusBar, View } from "react-native";

export default function CustomStatusBar({ bgBlue }) {
  return Platform.OS === "ios" ? (
    <View
      style={{
        height: 20,
        backgroundColor: bgBlue ? "#2E54D4" : "transparent",
      }}
    >
      <StatusBar
        barStyle={bgBlue ? "light-content" : "dark-content"}
        backgroundColor="transparent"
        translucent
      />
    </View>
  ) : (
    <StatusBar
      barStyle={bgBlue ? "light-content" : "dark-content"}
      backgroundColor={bgBlue ? "#2E54D4" : "transparent"}
    />
  );
}
