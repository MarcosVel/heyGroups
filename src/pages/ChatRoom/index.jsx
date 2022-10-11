import { Ionicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatList from "../../components/ChatList";
import FabButton from "../../components/FabButton";
import ModalNewGroup from "../../components/ModalNewGroup";
import CustomStatusBar from "../../components/StatusBar";
import firebase from "../../services/firebaseConnection";

export default function ChatRoom() {
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    const hasUser = firebase.auth().currentUser
      ? firebase.auth().currentUser.toJSON()
      : null;

    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getGroups() {
      firebase
        .firestore()
        .collection("MESSAGE_THREADS")
        .orderBy("lastMessage.createdAt", "desc")
        .limit(10)
        .get()
        .then(snapshot => {
          const firestoreThreads = snapshot.docs.map(doc => {
            return {
              _id: doc.id,
              name: "",
              lastMessage: { text: "" },
              ...doc.data(),
            };
          });

          if (isActive) {
            setThreads(firestoreThreads);
            setLoading(false);
          }
        });
    }

    getGroups();

    return () => {
      isActive = false;
    };
  }, [isFocused, updateList]);

  function handleSignOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("Auth");
      })
      .catch(() => {
        console.log("n possui usuario");
      });
  }

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  function deleteRoom(idOwner, idRoom) {
    console.log("idOwner:", idOwner);
    console.log("deletar:", idRoom);

    if (idOwner !== user?.uid) return;

    Alert.alert("Atenção!", "Você tem certeza que deseja deletar essa sala?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      { text: "OK", onPress: () => handleDeleteGroup(idRoom) },
    ]);
  }

  async function handleDeleteGroup(idRoom) {
    await firebase
      .firestore()
      .collection("MESSAGE_THREADS")
      .doc(idRoom)
      .delete();

    setUpdateList(!updateList);
  }

  return loading ? (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" color="#2E54D4" />
    </SafeAreaView>
  ) : (
    <>
      <CustomStatusBar bgBlue={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <GestureHandlerRootView style={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.chatBack}>
                {user && (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => handleSignOut()}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={28}
                      color="#fff"
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.title}>Grupos</Text>
              </View>
              <TouchableOpacity activeOpacity={0.6}>
                <Ionicons name="search" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={threads}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <ChatList
                  data={item}
                  deleteRoom={() => deleteRoom(item.owner, item._id)}
                />
              )}
              contentContainerStyle={{
                paddingVertical: 8,
              }}
            />

            <FabButton userStatus={user} setVisible={() => onOpen()} />
          </SafeAreaView>

          <ModalNewGroup
            modalizeRef={modalizeRef}
            user={user}
            setUpdateList={() => setUpdateList(!updateList)}
          />
        </GestureHandlerRootView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
});
