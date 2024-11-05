import React from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* App Title */}
        <Text style={styles.title}>StaminaGo</Text>

        {/* Workout of the Day */}
        <View style={styles.workoutContainer}>
          <Text style={styles.workoutTitle}>Bài tập hôm nay</Text>
          <Text style={styles.workoutDescription}>
            Cardio + Strength Training (45 phút)
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Calo đốt</Text>
            <Text style={styles.statValue}>320</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statTitle}>Phút tập</Text>
            <Text style={styles.statValue}>45</Text>
          </View>
        </View>

        {/* Start Button */}
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate("Exercise")}
        >
          <Text style={styles.startButtonText}>Bắt đầu thôi</Text>
        </Pressable>

        {/* Recent Activities */}
        <View style={styles.recentActivitiesContainer}>
          <Text style={styles.recentActivitiesTitle}>Hoạt động gần đây</Text>
          <Text style={styles.recentActivity}>Chạy bộ - 5km (30 phút)</Text>
          <Text style={styles.recentActivity}>Yoga - 20 phút</Text>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <View style={styles.footerNav}>
          <Pressable
            onPress={() => navigation.navigate("Map")}
            style={styles.footerNavItem}
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text style={styles.footerNavText}>Bản đồ</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Shop")}
            style={styles.footerNavItem}
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text style={styles.footerNavText}>Cửa hàng</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={styles.footerNavItem}
          >
            <FontAwesome5 name="user" size={24} color="#4F46E5" />
            <Text style={styles.footerNavText}>Hồ sơ</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Chat")}
            style={styles.footerNavItem}
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text style={styles.footerNavText}>Tin nhắn</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Settings")}
            style={styles.footerNavItem}
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text style={styles.footerNavText}>Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* Add other screens here */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 24,
  },
  workoutContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 24,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  workoutDescription: {
    color: "#6b7280",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statBox: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    padding: 16,
    width: "48%",
  },
  statTitle: {
    color: "#1e40af",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b82f6",
  },
  startButton: {
    backgroundColor: "#6366f1",
    borderRadius: 9999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
  },
  startButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  recentActivitiesContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 16,
    marginBottom: 24,
  },
  recentActivitiesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  recentActivity: {
    color: "#6b7280",
  },
  footer: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
  },
  footerNav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerNavItem: {
    alignItems: "center",
  },
  footerNavText: {
    color: "#4F46E5",
    fontSize: 12,
    marginTop: 4,
  },
});
