import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FabButton from "../../components/FabButton";
import firebase from "../../services/firebaseConnection";

export default function ChatRoom() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Auth");
      })
      .catch(() => {
        console.log("n possui usuario");
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2E54D4" />
      <View style={styles.header}>
        <View style={styles.chatBack}>
          <TouchableOpacity onPress={() => handleSignOut()}>
            <Ionicons name="arrow-back-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <FabButton setVisible={() => setModalVisible(true)} />
    </SafeAreaView>
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
