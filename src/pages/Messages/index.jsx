import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Message from "../../components/ChatMessages";
import CustomStatusBar from "../../components/StatusBar";
import firebase from "../../services/firebaseConnection";

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const user = firebase.auth().currentUser.toJSON();

  useEffect(() => {
    const unsubscribeListener = firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapshot => {
        const groupMessages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });

        setMessages(groupMessages);
      });

    return () => unsubscribeListener();
  }, []);

  async function sendMessage() {
    if (input === "") return;

    await firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("MESSAGES")
      .add({
        text: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user.uid,
          displayName: user.displayName,
        },
      });

    await firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .set(
        {
          lastMessage: {
            text: input,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
        },
        {
          merge: true,
        }
      );

    setInput("");
  }

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.container}>
        <LinearGradient style={styles.gradient} colors={["#f6f6f6", "#F2F2F2"]}>
          <FlatList
            style={{ width: "100%" }}
            data={messages}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <Message data={item} user={user} />}
            inverted
          />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={65}
          >
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua mensagem..."
                value={input}
                onChangeText={text => setInput(text)}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.btnSend,
                  { backgroundColor: input === "" ? "#a1a1a1" : "#2E54D4" },
                ]}
                disabled={input === ""}
                onPress={sendMessage}
              >
                <Feather name="send" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? -20 : 0,
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 36,
    marginBottom: 8,
  },
  input: {
    minHeight: 48,
    maxHeight: 130,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    marginRight: 8,
    paddingTop: Platform.OS === "ios" ? 16 : 12,
    elevation: 8,
    shadowColor: "#A6A6A6",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { height: 1 },
  },
  btnSend: {
    width: 48,
    height: 48,
    borderRadius: 24,
    paddingLeft: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
    elevation: 8,
    shadowColor: "#A6A6A6",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { height: 1 },
  },
});
