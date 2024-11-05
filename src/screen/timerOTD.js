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
import colors from "../../colors"; // Ensure you have defined colors
import { FontAwesome5 } from "@expo/vector-icons";

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
      { name: "Plank (2 lần plank, mỗi lần 30s)", reps: 2 },
    ],
    5: [
      { name: "Gập bụng", reps: 30 },
      { name: "Chống đẩy", reps: 30 },
      { name: "Nhảy dây", reps: 100 },
    ],
    10: [
      { name: "Chạy tại chỗ (5p), chạy nâng cao đùi (5p)", reps: 1 },
      { name: "Squat", reps: 40 },
      { name: "Burpees (1 chuỗi bài tập liên tiếp về giảm calo)", reps: 2 },
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* <Pressable onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{"<"} Back</Text>
        </Pressable> */}
        <Text style={styles.timerText}>
          Thời gian còn lại: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>

        <View style={styles.buttonContainer}>
          {[1, 5, 10, 20, 30].map((minute) => (
            <Pressable
              key={minute}
              onPress={() => startTimer(minute)}
              style={styles.startButton}
            >
              <Text style={styles.buttonText}>{minute} phút</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.exerciseHeader}>
          Gợi ý bài tập và số lần thực hiện:
        </Text>
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise, index) => (
            <Text key={index} style={styles.exerciseText}>
              - {exercise.name}: {exercise.reps} lần
            </Text>
          ))
        ) : (
          <Text style={styles.noExerciseText}>Chưa có bài tập nào</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <FooterButton icon="map-marker-alt" text="Map" navigateTo="Map" />
          <FooterButton icon="shopping-bag" text="Cửa hàng" navigateTo="Shop" />
          <FooterButton icon="comment-alt" text="Tin nhắn" navigateTo="chat" />
          <FooterButton icon="cog" text="Cài đặt" navigateTo="settings" />
        </View>
      </View>
    </View>
  );
};

const FooterButton = ({ icon, text, navigateTo }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(navigateTo)}
      style={styles.footerItem}
    >
      <FontAwesome5 name={icon} size={24} color="#4F46E5" />
      <Text style={styles.footerText}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
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
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5, // Add horizontal margin for spacing
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  exerciseHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4F46E5",
    marginBottom: 10,
    textAlign: "left", // Align header to the left
  },
  exerciseText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left", // Align exercise text to the left
    width: "100%", // Ensure it takes full width
  },
  noExerciseText: {
    fontSize: 16,
    textAlign: "center",
    color: "#999",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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

export default TimerOTD;
