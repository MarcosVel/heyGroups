import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import FabButton from "../../components/FabButton";
import firebase from "../../services/firebaseConnection";

export default function ChatRoom() {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);

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

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const modalContent = () => {
    return (
      <KeyboardAvoidingView>
        <Text style={styles.modalTitle}>Criar um novo grupo?</Text>
        <TextInput style={styles.input} placeholder="Nome do grupo" />
        <TouchableOpacity activeOpacity={0.6} style={styles.btnCreate}>
          <Text style={styles.btnText}>Criar sala</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <GestureHandlerRootView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#2E54D4" />
          <View style={styles.header}>
            <View style={styles.chatBack}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => handleSignOut()}
              >
                <Ionicons name="arrow-back-outline" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.title}>Grupos</Text>
            </View>
            <TouchableOpacity activeOpacity={0.6}>
              <Ionicons name="search" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <FabButton setVisible={() => onOpen()} />
        </SafeAreaView>

        <Modalize
          ref={modalizeRef}
          modalHeight={230}
          keyboardAvoidingBehavior="height"
          modalStyle={{
            backgroundColor: "#F6F6F6",
            padding: 28,
          }}
        >
          {modalContent()}
        </Modalize>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
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
  modalTitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "bold",
    color: "#1b1b1b",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  btnCreate: {
    marginTop: 16,
    backgroundColor: "#2E54D4",
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
});
