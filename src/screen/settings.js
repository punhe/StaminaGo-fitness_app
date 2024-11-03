import React, { useState } from "react";
import { View, Text, Switch, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const [isEnabledNotifications, setIsEnabledNotifications] = useState(false);
  const [isEnabledDarkMode, setIsEnabledDarkMode] = useState(false);
  const navigation = useNavigation();

  const toggleNotifications = () =>
    setIsEnabledNotifications((previousState) => !previousState);
  const toggleDarkMode = () =>
    setIsEnabledDarkMode((previousState) => !previousState);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-indigo-500 py-4">
        <Text className="text-center text-2xl font-bold text-white">
          Cài đặt
        </Text>
      </View>

      {/* Notification Setting */}
      <View className=" bg-white mx-auto mt-8 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-700">Thông báo</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledNotifications ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleNotifications}
            value={isEnabledNotifications}
          />
        </View>
      </View>

      {/* Dark Mode Setting */}
      <View className=" bg-white mx-auto mt-4 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold text-gray-700">
            Chế độ tối
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabledDarkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isEnabledDarkMode}
          />
        </View>
      </View>

      {/* Account Settings Button */}
      <Pressable
        className=" bg-indigo-500 mx-auto mt-8 p-4 rounded-lg flex items-center justify-center shadow-md"
        onPress={() => navigation.navigate("profile")}
      >
        <Text className="text-white text-lg font-semibold">
          Cài đặt tài khoản
        </Text>
      </Pressable>

      {/* Privacy Policy Button */}
      <Pressable
        className=" bg-indigo-500 mx-auto mt-4 p-4 rounded-lg flex items-center justify-center shadow-md"
        onPress={() => navigation.navigate("privacyPolicy")}
      >
        <Text className="text-white text-lg font-semibold">
          Chính sách bảo mật
        </Text>
      </Pressable>
    </View>
  );
}
