import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db, chatsRef } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const q = query(chatsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("index");
    }
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(chatsRef, {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"} Trở lại</Text>
      </Pressable>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={styles.messagesContainer}
        textInputStyle={styles.textInput}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
        }}
      />
      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <Pressable onPress={handleGoBack} style={styles.footerItem}>
            <FontAwesome5 name="home" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Trang chủ</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("todaysGoal")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="bullseye" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Mục tiêu</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("mealPlanner")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="utensils" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Bữa ăn</Text>
          </Pressable>

          <Pressable style={styles.footerItem}>
            <FontAwesome5 name="comments" size={24} color="#4F46E5" />
            <Text style={[styles.navText, styles.activeNavText]}>Chat</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: colors.gray,
  },
  messagesContainer: {
    backgroundColor: colors.white,
  },
  textInput: {
    backgroundColor: colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.lightGray,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navText: {
    color: "#6366F1", // Indigo-500
    fontWeight: "bold",
    fontSize: 14,
  },
  activeNavText: {
    color: "#4F46E5", // Một tông màu đậm hơn của Indigo cho mục đang active
  },
});
