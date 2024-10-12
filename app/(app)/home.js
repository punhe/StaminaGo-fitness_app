import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'
import { Button } from "react-native";
import { useNavigation } from "expo-router";

export default function Home() {

  const navigation = useNavigation();
  
  return (
    <View className='flex-1 bg-white'>
      <Text>Home</Text>
      <Button title="Xem địa chỉ" onPress={() => navigation.navigate("map")} />
      <Button title="Chat" onPress={() => navigation.navigate("chat")} />
      <Button title="Shop" onPress={() => navigation.navigate("shop")} />
    </View>
  )
}