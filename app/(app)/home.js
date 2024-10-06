import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Home() {
  const {logout, user} = useAuth();
  const handleLogout = async () =>{
    await logout();
  }
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={handleLogout}>
        <Text>Đăng xuất</Text>
      </Pressable>
    </View>
  )
}