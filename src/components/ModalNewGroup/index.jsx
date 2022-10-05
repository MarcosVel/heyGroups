import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import firebase from "../../services/firebaseConnection";

export default function ModalNewGroup({ modalizeRef, user }) {
  const [roomName, setRoomName] = useState("");

  function createRoom() {
    if (roomName === "") return;

    firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .add({
        name: roomName,
        owner: user.uid,
        lastMessage: {
          text: `Grupo ${roomName} criado. Bem vindo(a)!`,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
      })
      .then(docRef => {
        docRef
          .collection("messages")
          .add({
            text: `Grupo ${roomName} criado. Bem vindo(a)!`,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setRoomName("");
            Keyboard.dismiss();
            modalizeRef.current?.close();
          });
      })
      .catch(err => {
        console.log("Creat group error:", err);
      });
  }

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={230}
      keyboardAvoidingBehavior="height"
      modalStyle={{
        backgroundColor: "#F6F6F6",
        padding: 28,
      }}
      scrollViewProps={{
        keyboardShouldPersistTaps: "handled",
      }}
    >
      <KeyboardAvoidingView>
        <Text style={styles.modalTitle}>Criar um novo grupo?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do grupo"
          value={roomName}
          onChangeText={text => setRoomName(text)}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.btnCreate}
          onPress={() => createRoom()}
        >
          <Text style={styles.btnText}>Criar sala</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modalize>
  );
}

const styles = StyleSheet.create({
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
