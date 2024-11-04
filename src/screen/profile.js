import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
  TextInput,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = "JvHDTMZkSoO9a24QjdOKAcS9VuN2";
        const userRef = doc(db, "users", userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileData(userData);
          setNewUsername(userData.username);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("index");
    }
  };

  const handleSaveUsername = async () => {
    try {
      const userId = "JvHDTMZkSoO9a24QjdOKAcS9VuN2";
      const userRef = doc(db, "users", userId);

      await updateDoc(userRef, {
        username: newUsername,
      });

      setProfileData({ ...profileData, username: newUsername });
      setIsEditing(false);
      Alert.alert("Success", "Username updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Lỗi khi cập nhật tên");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <View style={styles.profileSection}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: profileData?.profileUrl }}
            style={styles.profileImage}
          />
        </View>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              style={styles.editInput}
            />
            <Pressable onPress={handleSaveUsername} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>
              {profileData?.username || "Unknown User"}
            </Text>
            <Pressable
              onPress={() => setIsEditing(true)}
              style={styles.editButton}
            >
              <Text style={styles.editButtonText}>Sửa tên</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.menuSection}>
        {["Mục tiêu hôm nay", "Bữa ăn", "Hoạt động"].map((item, index) => (
          <Pressable
            key={index}
            onPress={() =>
              navigation.navigate(
                ["todaysGoal", "mealPlanner", "workoutOTD"][index]
              )
            }
            style={styles.menuItem}
          >
            <Text style={styles.menuItemText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.settingsSection}>
        <Pressable
          onPress={() => navigation.navigate("settings")}
          style={styles.settingsButton}
        >
          <Text style={styles.settingsButtonText}>Cài đặt</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6366f1",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 80,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "white",
    overflow: "hidden",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  usernameContainer: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#fbbf24",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  editContainer: {
    alignItems: "center",
  },
  editInput: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    fontSize: 18,
    width: 200,
    textAlign: "center",
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#34d399",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  menuSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    elevation: 3,
  },
  menuItemText: {
    textAlign: "center",
    color: "#6366f1",
    fontWeight: "bold",
    fontSize: 16,
  },
  settingsSection: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  settingsButton: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 3,
  },
  settingsButtonText: {
    textAlign: "center",
    color: "#6366f1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
