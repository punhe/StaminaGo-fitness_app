import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ExerciseHome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>Tập luyện thôi</Text>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("workoutOTD")}
        >
          <FontAwesome5 name="dumbbell" size={24} color="#ffffff" />
          <Text style={styles.cardText}>Các bài tập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TimerOTD")}
        >
          <FontAwesome5 name="stopwatch" size={24} color="#ffffff" />
          <Text style={styles.cardText}>Bộ đếm thời gian</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("calculatationOTD")}
        >
          <FontAwesome5 name="calculator" size={24} color="#ffffff" />
          <Text style={styles.cardText}>Tính BMI</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.footerItem}
          onPress={() => navigation.navigate("Map")}
        >
          <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
          <Text style={styles.footerText}>Bản đồ</Text>
        </Pressable>
        <Pressable
          style={styles.footerItem}
          onPress={() => navigation.navigate("Shop")}
        >
          <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
          <Text style={styles.footerText}>Cửa hàng</Text>
        </Pressable>
        <Pressable
          style={styles.footerItem}
          onPress={() => navigation.navigate("chat")}
        >
          <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
          <Text style={styles.footerText}>Tin nhắn</Text>
        </Pressable>
        <Pressable
          style={styles.footerItem}
          onPress={() => navigation.navigate("settings")}
        >
          <FontAwesome5 name="cog" size={24} color="#4F46E5" />
          <Text style={styles.footerText}>Cài đặt</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1f2937",
  },
  card: {
    backgroundColor: "#4F46E5", // Thay đổi màu nền
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    color: "#ffffff", // Thay đổi màu chữ
    fontWeight: "600",
    marginLeft: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    color: "#4F46E5",
    fontSize: 12,
    marginTop: 5,
  },
});

export default ExerciseHome;
