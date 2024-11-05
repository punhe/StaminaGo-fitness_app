import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av"; // Cài đặt expo-av nếu chưa có

const WorkoutDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { workout } = route.params;
  const [isVideoVisible, setVideoVisible] = useState(false); // State để kiểm soát hiển thị video

  const toggleVideo = () => {
    setVideoVisible(!isVideoVisible); // Chuyển đổi trạng thái hiển thị video
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={workout.image} style={styles.image} />

        {/* Nút để hiển thị video */}
        <TouchableOpacity onPress={toggleVideo} style={styles.videoButton}>
          <Text style={styles.videoButtonText}>
            {isVideoVisible ? "Ẩn video" : "Xem video hướng dẫn"}
          </Text>
        </TouchableOpacity>

        {/* Hiển thị video nếu trạng thái isVideoVisible là true */}
        {isVideoVisible && (
          <Video
            source={{ uri: workout.video }} // Sử dụng URL video
            style={styles.video}
            useNativeControls // Hiển thị các điều khiển video
            resizeMode="contain"
            isLooping // Tùy chọn lặp lại video
          />
        )}

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#4F46E5" />
            <Text style={styles.backButtonText}>Quay lại</Text>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>{workout.title}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.description}>{workout.description}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Hướng dẫn</Text>
            <Text style={styles.instructions}>{workout.instructions}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  video: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  videoButton: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  videoButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
  },
});

export default WorkoutDetail;
