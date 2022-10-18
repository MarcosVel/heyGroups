import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomStatusBar from "../../components/StatusBar";

export default function Search() {
  const [input, setInput] = useState("");

  return (
    <>
      <CustomStatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
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
              // onPress={sendMessage}
            >
              <Feather name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
