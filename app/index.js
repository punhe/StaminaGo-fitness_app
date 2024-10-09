import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

// StartPage Component
export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

// Home Component
import React from "react";
import { Button } from "react-native";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Home Page</Text>
      <Button title="Go to Map" onPress={() => navigation.navigate("map")} />
    </View>
  );
};

export { Home };
