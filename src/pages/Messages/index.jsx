import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "../../services/firebaseConnection";

export default function Messages({ route }) {
  const { thread } = route.params;
  const [messages, setMessages] = useState([]);
  const user = firebase.auth().currentUser.toJSON();

  useEffect(() => {
    const unsubscribeListener = firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(thread._id)
      .collection("messages")
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

  return (
    <View style={styles.container}>
      <Text>Messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
