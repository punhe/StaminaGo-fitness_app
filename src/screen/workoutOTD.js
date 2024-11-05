//workoutOTD
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { workouts } from "../../utils/workoutData";

const WorkoutOTD = () => {
  const navigation = useNavigation();

  const renderWorkoutCard = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutCard}
      onPress={() => navigation.navigate("WorkoutDetail", { workout: item })}
    >
      <ImageBackground
        source={item.image}
        style={styles.workoutCardImage}
        imageStyle={styles.workoutCardImageStyle}
      >
        <View style={styles.workoutCardOverlay}>
          <Text style={styles.workoutCardTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Bài tập hôm nay</Text>
      </View>

      {/* Workout of the Day Banner */}
      <View style={styles.bannerContainer}>
        <ImageBackground
          source={require("../../assets/images/anh1.jpg")}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageStyle}
        ></ImageBackground>
      </View>

      {/* Danh sách các bài tập */}
      <FlatList
        data={workouts}
        renderItem={renderWorkoutCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.workoutList}
      />

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Pressable
            onPress={() => navigation.navigate("Map")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text style={styles.footerText}>Bản đồ</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("shop")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text style={styles.footerText}>Cửa hàng</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("chat")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text style={styles.footerText}>Tin nhắn</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("settings")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text style={styles.footerText}>Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    backgroundColor: "#4F46E5",
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  bannerImage: {
    height: 200,
    justifyContent: "flex-end",
  },
  bannerImageStyle: {
    borderRadius: 15,
  },
  bannerOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  workoutList: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  workoutCard: {
    marginBottom: 15,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "white",
  },
  workoutCardImage: {
    height: 150,
    justifyContent: "flex-end",
  },
  workoutCardImageStyle: {
    borderRadius: 12,
  },
  workoutCardOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 12,
  },
  workoutCardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  footerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    color: "#4F46E5",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: 5,
  },
});

export default WorkoutOTD;
