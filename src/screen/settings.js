import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/authContext";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { logout } = useAuth();

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    setLoading(true);
    const response = await logout();
    setLoading(false);

    if (response.success) {
      navigation.navigate("SignIn");
    } else {
      console.error("Logout failed:", response.msg);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cài đặt</Text>
      </View>

      <View style={styles.borderBox}>
        <Text style={styles.staminaText}>StaminaGo</Text>
      </View>

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

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </Pressable>

      {/* Modal Loading */}
      <Modal transparent={true} visible={loading} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#4F46E5" />
            <Text style={styles.loadingText}>Đang đăng xuất...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    backgroundColor: "#4F46E5",
    paddingVertical: 20,
    alignItems: "center",
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
  },

  borderBox: {
    borderWidth: 2,
    borderColor: "#FF4D4D",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  staminaText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#4F46E5",
    marginVertical: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  logoutButton: {
    backgroundColor: "#FF4D4D",
    marginVertical: 10,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  logoutButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  loadingBox: {
    width: "80%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#374151",
  },
});
