import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, Pressable, TextInput, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from 'expo-router';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);  // State for editing mode
  const [newUsername, setNewUsername] = useState('');  // State for the new username
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = 'JvHDTMZkSoO9a24QjdOKAcS9VuN2';  // Replace with dynamic user ID from auth
        const userRef = doc(db, 'users', userId);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setProfileData(userData);
          setNewUsername(userData.username);  // Set initial value of newUsername to the current username
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error fetching profile:', error);
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
      // If we can't go back, try to navigate to the initial route
      navigation.navigate('index');
    }
  };

  // Function to update username in Firestore
  const handleSaveUsername = async () => {
    try {
      const userId = 'JvHDTMZkSoO9a24QjdOKAcS9VuN2';  // Replace with dynamic user ID from auth
      const userRef = doc(db, 'users', userId);

      // Update Firestore with new username
      await updateDoc(userRef, {
        username: newUsername,
      });

      // Update local state and exit editing mode
      setProfileData({ ...profileData, username: newUsername });
      setIsEditing(false);
      Alert.alert("Success", "Username updated successfully!");
    } catch (error) {
      Alert.alert("Error", "Lỗi khi cập nhật tên");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-indigo-500">
      {/* Back Button */}
      <Pressable 
        onPress={handleGoBack}
        className="absolute top-10 left-5"
      >
        <Text style={{ fontSize: 18, color: 'white' }}>{'<'} Trở về</Text>
      </Pressable>
      
      {/* Profile Section */}
      <View className="flex-1 justify-center items-center mt-16">
        
        {/* Profile Image */}
        <View className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
          <Image
            source={{ uri: profileData?.profileUrl }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>

        {/* Username Section */}
        {isEditing ? (
          // Editable Username Field
          <View className="mt-4">
            <TextInput
              value={newUsername}
              onChangeText={setNewUsername}
              style={{
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
                fontSize: 18,
                width: 200,
                textAlign: 'center',
              }}
            />
            <Pressable
              onPress={handleSaveUsername}
              style={{
                backgroundColor: 'green',
                paddingVertical: 10,
                paddingHorizontal: 20,
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Lưu</Text>
            </Pressable>
          </View>
        ) : (
          // Display Username with Edit Button
          <View className="mt-4">
            <Text className="text-white text-3xl font-bold">
              {profileData?.username || 'Unknown User'}
            </Text>
            <Pressable
              onPress={() => setIsEditing(true)}  // Enable editing mode
              style={{
                backgroundColor: 'orange',
                paddingVertical: 5,
                paddingHorizontal: 15,
                marginTop: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Sửa tên</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Menu Section for Fitness App */}
      <View className="flex-1 w-full px-5 mt-8">
        <Pressable className="bg-white rounded-full py-3 px-4 mb-4 shadow-md">
          <Text className="text-center text-indigo-500 font-bold">Mục tiêu hôm nay</Text>
        </Pressable>
        <Pressable className="bg-white rounded-full py-3 px-4 mb-4 shadow-md">
          <Text className="text-center text-indigo-500 font-bold">Bữa ăn</Text>
        </Pressable>
        <Pressable className="bg-white rounded-full py-3 px-4 mb-4 shadow-md">
          <Text className="text-center text-indigo-500 font-bold">Hoạt động</Text>
        </Pressable>
        
      </View>

      {/* Settings and Logout Section */}
      <View className="absolute bottom-10 w-full px-5">
        <Pressable 
          onPress={() => navigation.navigate('settings')}
          className="bg-white rounded-full py-3 px-4 mb-4 shadow-md"
        >
          <Text className="text-center text-indigo-500 font-bold">Cài đặt</Text>
        </Pressable>
      </View>
    </View>
  );
}
