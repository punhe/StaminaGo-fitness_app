import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  return (
    <View className='flex-1 bg-gray-100'>

      {/* Image Slider Placeholder */}
      <View className='h-48 w-12/12 bg-white border border-gray-300 mx-auto mt-10 rounded-lg shadow-lg flex items-center justify-center'>
        <Text className='text-gray-500'>Image Slide</Text>
      </View>

      {/* Start Button */}
      <Pressable
        className='h-14 w-12/12 bg-indigo-500 mx-auto rounded-lg flex items-center justify-center mt-10 shadow-lg'
        onPress={() => navigation.navigate('exercise')}
      >
        <Text className='text-white text-lg font-semibold'>Bắt đầu thôi</Text>
      </Pressable>

      {/* Footer Navigation */}
      <View className='absolute bottom-0 w-full border-t border-gray-300 py-4 bg-white'>
        <View className='flex-row justify-around'>
          <Pressable onPress={() => navigation.navigate('map')}>
            <Text className='text-indigo-500 font-bold text-base'>Map</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('shop')}>
            <Text className='text-indigo-500 font-bold text-base'>Cửa hàng</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('chat')}>
            <Text className='text-indigo-500 font-bold text-base'>Tin nhắn</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('settings')}>
            <Text className='text-indigo-500 font-bold text-base'>Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
