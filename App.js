import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import firebase from "./src/services/firebaseConnection";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
