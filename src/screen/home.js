import React from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Home() {
  const navigation = createStackNavigator();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 px-4 pt-10">
        {/* App Title */}
        <Text className="text-3xl font-bold text-blue-600 mb-6">StaminaGo</Text>

        {/* Workout of the Day */}
        <View className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Bài tập hôm nay
          </Text>
          <Text className="text-gray-600">
            Cardio + Strength Training (45 phút)
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-blue-100 rounded-xl p-4 w-[48%]">
            <Text className="text-blue-800 font-semibold">Calo đốt</Text>
            <Text className="text-2xl font-bold text-blue-600">320</Text>
          </View>
          <View className="bg-green-100 rounded-xl p-4 w-[48%]">
            <Text className="text-green-800 font-semibold">Phút tập</Text>
            <Text className="text-2xl font-bold text-green-600">45</Text>
          </View>
        </View>

        {/* Start Button */}
        <Pressable
          className="bg-indigo-500 rounded-full py-4 px-8 items-center justify-center shadow-lg mb-6"
          onPress={() => navigation.Navigator("exercise")}
        >
          <Text className="text-white text-xl font-semibold">Bắt đầu thôi</Text>
        </Pressable>

        {/* Recent Activities */}
        <View className="bg-white rounded-xl shadow-lg p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Hoạt động gần đây
          </Text>
          <Text className="text-gray-600">Chạy bộ - 5km (30 phút)</Text>
          <Text className="text-gray-600">Yoga - 20 phút</Text>
        </View>
      </View>

      {/* Footer Navigation */}
      <View className="bg-white border-t border-gray-200 py-2">
        <View className="flex-row justify-around">
          <Pressable
            onPress={() => navigation.navigate("map")}
            className="items-center"
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-xs mt-1">Bản đồ</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("shop")}
            className="items-center"
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-xs mt-1">Cửa hàng</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("profile")}
            className="items-center"
          >
            <FontAwesome5 name="user" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-xs mt-1">Hồ sơ</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("chat")}
            className="items-center"
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-xs mt-1">Tin nhắn</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("settings")}
            className="items-center"
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text className="text-indigo-600 text-xs mt-1">Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
