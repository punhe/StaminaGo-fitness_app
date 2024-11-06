import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/authContext";
import { AntDesign } from "@expo/vector-icons";

const android = Platform.OS === "android";

export default function HomeHeader() {
  const { logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={[styles.headerContainer, 
      { paddingTop: android ? top : top + 10 }
      ]}
    >
      <Text style={styles.title}>StaminaGo</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <AntDesign name="logout" size={24} color="#FF4D4F" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Pushes the logout button to the right
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#4F46E5", // Indigo color for header background
    paddingBottom: 6,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 20,
    elevation: 5, // For Android shadow
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android
  },
  logoutText: {
    marginLeft: 8,
    color: "#4F46E5",
    fontWeight: "600",
  },
});
