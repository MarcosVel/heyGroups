import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FabButton from "../../components/FabButton";
import ModalNewGroup from "../../components/ModalNewGroup";
import CustomStatusBar from "../../components/StatusBar";
import firebase from "../../services/firebaseConnection";

export default function ChatRoom() {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const hasUser = firebase.auth().currentUser
      ? firebase.auth().currentUser.toJSON()
      : null;

    setUser(hasUser);
  }, [isFocused]);

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("Auth");
      })
      .catch(() => {
        console.log("n possui usuario");
      });
  }

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <CustomStatusBar bgBlue={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.chatBack}>
                {user && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleSignOut()}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={28}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.title}>Grupos</Text>
              </View>
              <TouchableOpacity activeOpacity={0.6}>
                <Ionicons name="search" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <FabButton userStatus={user} setVisible={() => onOpen()} />
          </SafeAreaView>

          <ModalNewGroup modalizeRef={modalizeRef} user={user} />
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#2E54D4",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  chatBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#FFF",
  },
});
