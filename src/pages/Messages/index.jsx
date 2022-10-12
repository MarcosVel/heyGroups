import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { FlatList, Platform, SafeAreaView, StyleSheet } from "react-native";
import Message from "../../components/ChatMessages";
import CustomStatusBar from "../../components/StatusBar";
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
    <>
      <CustomStatusBar />
      <SafeAreaView style={styles.container}>
        <LinearGradient style={styles.gradient} colors={["#f6f6f6", "#F2F2F2"]}>
          <FlatList
            style={{ width: "100%" }}
            data={messages}
            keyExtractor={item => item._id}
            renderItem={({ item }) => <Message data={item} user={user} />}
          />
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
});
