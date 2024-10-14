import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ExerciseHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chào mừng tới app của tôi</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("workoutOTD")}
      >
        <Text style={styles.buttonText}>Các bài tập</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("timerOTD")}
      >
        <Text style={styles.buttonText}>Bộ đếm thời gian</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("calculatationOTD")}
      >
        <Text style={styles.buttonText}>Tính BMI</Text>
      </TouchableOpacity>
      <View className="absolute bottom-0 w-full border-t border-gray-300 py-4 bg-white">
        <View className="flex-row justify-around">
          <Pressable onPress={() => navigation.navigate("map")}>
            <Text className="text-indigo-500 font-bold text-base">Map</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("shop")}>
            <Text className="text-indigo-500 font-bold text-base">
              Cửa hàng
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("chat")}>
            <Text className="text-indigo-500 font-bold text-base">
              Tin nhắn
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("settings")}>
            <Text className="text-indigo-500 font-bold text-base">Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#6366F1",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExerciseHome;
