import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChatRoom from "../pages/ChatRoom";
import SignIn from "../pages/SignIn";

const AppStack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ title: "Faça login" }}
      />
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
