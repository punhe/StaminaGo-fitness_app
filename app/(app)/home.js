import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'
import { Button } from "react-native";
import { useNavigation } from "expo-router";

export default function Home() {
  const {logout, user} = useAuth();
  const navigation = useNavigation();
  const handleLogout = async () =>{
    await logout();
  }
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </Pressable>
      <Button title="Xem địa chỉ" onPress={() => navigation.navigate("map")} />
    </View>
  )
}