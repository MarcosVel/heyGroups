import { Link } from "@react-navigation/native";
import { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>HeyGroups</Text>
        <Text style={styles.description}>
          Ajude, colabore, faça networking!
        </Text>

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Nome"
          onTextChange={text => setName(text)}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="seuemail@email.com"
          onTextChange={text => setEmail(text)}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="******"
          onTextChange={text => setPassword(text)}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Cadastrar</Text>
        </TouchableOpacity>

        <Link style={styles.link} to="/ChatRoom">
          Já possuo uma conta
        </Link>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6F6F6",
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
  link: {
    color: "#AEAEAE",
    fontWeight: "bold",
  },
});
