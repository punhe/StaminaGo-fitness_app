import React, { useState } from "react";
import { View, Text, Switch, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeHeader from "../components/HomeHeader";

export default function Settings() {
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(false);
  const [isEnabledDarkMode, setIsEnabledDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleNotifications = () =>
    setIsEnabledNotifications((previousState) => !previousState);
  const toggleDarkMode = () =>
    setIsEnabledDarkMode((previousState) => !previousState);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerText}>Cài đặt</Text>
      </View>

      {/* Notification Setting */}
      {/* <View style={styles.settingContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Thông báo</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledNotifications ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleNotifications}
            value={isEnabledNotifications}
          />
        </View>
      </View> */}

      {/* Dark Mode Setting */}
      {/* <View style={styles.settingContainer}>
        <View style={styles.settingRow}>
          <Text style={styles.settingText}>Chế độ tối</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isEnabledDarkMode}
          />
        </View>
      </View> */}

      {/* Account Settings Button */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.buttonText}>Cài đặt tài khoản</Text>
      </Pressable>

      {/* Privacy Policy Button */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Text style={styles.buttonText}>Chính sách bảo mật</Text>
      </Pressable>
      <HomeHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Light gray background
  },
  header: {
    backgroundColor: "#4F46E5", // Indigo color
    paddingVertical: 16,
    alignItems: "center",
    elevation: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  settingContainer: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151", // Dark gray color
  },
  button: {
    backgroundColor: "#4F46E5",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
