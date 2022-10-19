import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ChatList from "../../components/ChatList";
import CustomStatusBar from "../../components/StatusBar";
import firebase from "../../services/firebaseConnection";

export default function Search() {
  const isFocused = useIsFocused();
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    const hasUser = firebase.auth().currentUser
      ? firebase.auth().currentUser.toJSON()
      : null;

    setUser(hasUser);
  }, [isFocused]);

  async function handleSearch() {
    if (input === "") return;

    const responseSearch = await firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .where("name", ">=", input)
      .where("name", "<=", input + "\uf8ff")
      .get()
      .then(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            name: "",
            lastMessage: {
              text: "",
            },
            ...documentSnapshot.data(),
          };
        });

        setFilteredGroups(threads);
      });
  }

  return (
    <>
      <CustomStatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Qual o nome do grupo?"
              value={input}
              onChangeText={text => setInput(text)}
            />
            <TouchableOpacity
              style={[
                styles.btnSend,
                { backgroundColor: input === "" ? "#a1a1a1" : "#2E54D4" },
              ]}
              disabled={input === ""}
              onPress={handleSearch}
            >
              <Feather name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            data={filteredGroups}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <ChatList data={item} userStatus={user} />
            )}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    marginTop: Platform.OS === "ios" ? -20 : 0,
  },
  inputView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    minHeight: 48,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
    elevation: 8,
    shadowColor: "#A6A6A6",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { height: 1 },
  },
  btnSend: {
    width: 48,
    height: 48,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
    borderRadius: 24,
    elevation: 8,
    shadowColor: "#A6A6A6",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { height: 1 },
  },
});
