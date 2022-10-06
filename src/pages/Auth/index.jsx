import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomStatusBar from "../../components/StatusBar";
import firebase from "../../services/firebaseConnection";

export default function Auth() {
  const navigation = useNavigation();
  const [typeCreate, setTypeCreate] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (typeCreate) {
      if (name === "" || email === "" || password === "") {
        return console.warn("Complete todos os campos");
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(snapshot => {
          snapshot.user
            .updateProfile({
              displayName: name,
            })
            .then(() => {
              navigation.goBack();
            });
        })
        .catch(err => {
          if (err.code === "auth/email-already-in-use") {
            console.warn("Email already in use");
          } else if (err.code === "auth/invalid-email") {
            console.warn("Invalid email");
          } else {
            console.log("Error creating user", err);
          }
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack();
        })
        .catch(err => {
          if (err.code === "auth/invalid-email") {
            console.warn("Invalid email");
          } else {
            console.log("Error creating user", err);
          }
        });
    }
  }

  return (
    <>
      <CustomStatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.avoidingView}
            behavior={Platform.OS === "ios" && "padding"}
          >
            <View style={styles.content}>
              <Text style={styles.logo}>HeyGroups</Text>
              <Text style={styles.description}>
                Ajude, colabore, faça networking!
              </Text>

              {typeCreate && (
                <TextInput
                  style={styles.input}
                  value={name}
                  placeholder="Nome"
                  onChangeText={text => setName(text)}
                  placeholderTextColor="#999"
                />
              )}

              <TextInput
                style={styles.input}
                value={email}
                placeholder="seuemail@email.com"
                onChangeText={text => setEmail(text)}
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                value={password}
                placeholder="******"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                placeholderTextColor="#999"
              />

              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleLogin()}
              >
                <Text style={styles.btnText}>
                  {typeCreate ? "Cadastrar" : "Acessar"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setTypeCreate(!typeCreate)}>
                <Text style={styles.textLink}>
                  {typeCreate ? "Já possuo uma conta" : "Criar uma nova conta"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
  },
  avoidingView: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#AEAEAE",
    marginTop: 4,
    marginBottom: 32,
  },
  input: {
    width: "85%",
    color: "#1b1b1b",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 12,
  },
  btn: {
    width: "85%",
    alignItems: "center",
    backgroundColor: "#2E54D4",
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "bold",
  },
  textLink: {
    color: "#AEAEAE",
    fontWeight: "bold",
  },
});
