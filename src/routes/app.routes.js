import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Auth from "../pages/Auth";
import ChatRoom from "../pages/ChatRoom";
import Messages from "../pages/Messages";

const AppStack = createNativeStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator initialRouteName="ChatRoom">
      <AppStack.Screen
        name="Auth"
        component={Auth}
        options={{ title: "Faça login" }}
      />
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Messages"
        component={Messages}
        options={({ route }) => ({
          title: route.params.thread.name,
        })}
      />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
