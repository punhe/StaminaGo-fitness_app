import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { FontAwesome5 } from '@expo/vector-icons';

const TimerOTD = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);

  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("index");
    }
  };

  const exercises = {
    1: [
      { name: "Bài tập về hít thở (tập nín thở trong 30s)", reps: 2 },
      { name: "Chống đẩy", reps: 10 },
      { name: "Squat", reps: 15 },
      { name: "Plank ( 2 lần plank, mỗi lần 30s )", reps: 2 },
    ],
    5: [
      { name: "Gập bụng", reps: 30 },
      { name: "Chống đẩy", reps: 30 },
      { name: "Nhảy dây", reps: 100 },
    ],
    10: [
      { name: "Chạy tại chỗ (5p), chạy nâng cao đùi (5p)", reps: 1 },
      { name: "Squat", reps: 40 },
      { name: "Burpees ( 1 chuỗi bài tập liên tiếp về giảm calo )", reps: 2 },
    ],
    20: [
      { name: "Các động tác Cardio", reps: 10 },
      { name: "Các động tác Lunges", reps: 50 },
      { name: "Yoga cơ bản", reps: 5 },
    ],
    30: [
      { name: "Thiền", reps: 1 },
      { name: "Yoga nâng cao", reps: 1 },
      { name: "Chạy bộ", reps: 2 },
    ],
  };

  useEffect(() => {
    let interval;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      Alert.alert("Hết thời gian", "Thời gian đã kết thúc!");
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const startTimer = (minutes) => {
    setSecondsRemaining(minutes * 60);
    setIsRunning(true);
    setExerciseList(exercises[minutes] || []);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Pressable onPress={handleGoBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>{"<"} Back</Text>
          </Pressable>
          <Text className="text-2xl font-bold text-indigo-600 mb-4 text-center">
            Thời gian còn lại: {minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </Text>

          <View className="flex-row justify-between mb-6">
            <Pressable
              onPress={() => startTimer(1)}
              className="bg-indigo-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">1 phút</Text>
            </Pressable>
            <Pressable
              onPress={() => startTimer(5)}
              className="bg-indigo-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">5 phút</Text>
            </Pressable>
            <Pressable
              onPress={() => startTimer(10)}
              className="bg-indigo-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">10 phút</Text>
            </Pressable>
            <Pressable
              onPress={() => startTimer(20)}
              className="bg-indigo-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">20 phút</Text>
            </Pressable>
            <Pressable
              onPress={() => startTimer(30)}
              className="bg-indigo-500 px-4 py-2 rounded-md"
            >
              <Text className="text-white font-semibold">30 phút</Text>
            </Pressable>
          </View>

          <Text className="text-xl font-semibold text-indigo-500 mb-4 text-center">
            Gợi ý bài tập và số lần thực hiện:
          </Text>
          {exerciseList.length > 0 ? (
            exerciseList.map((exercise, index) => (
              <Text key={index} className="text-lg mb-2 text-center">
                - {exercise.name}: {exercise.reps} lần
              </Text>
            ))
          ) : (
            <Text className="text-lg text-center">Chưa có bài tập nào</Text>
          )}
        </View>
      </ScrollView>

      <View className="w-full border-t border-gray-300 py-4 bg-white">
        <View className="flex-row justify-around">
          <Pressable
            onPress={() => navigation.navigate("map")}
            className="items-center"
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">Map</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("shop")}
            className="items-center"
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">
              Cửa hàng
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("chat")}
            className="items-center"
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">
              Tin nhắn
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("settings")}
            className="items-center"
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TimerOTD;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: colors.white,
  },
});
