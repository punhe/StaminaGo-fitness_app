import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Octicons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const { forgetPassword } = useAuth();
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    const email = emailRef.current;

    if (!email) {
      Alert.alert("Quên mật khẩu", "Làm ơn nhập email của bạn!");
      return;
    }

    setLoading(true);
    const response = await forgetPassword(email);
    setLoading(false);

    if (response.success) {
      Alert.alert("Quên mật khẩu", response.msg);
    } else {
      Alert.alert("Lỗi", response.msg);
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 50 }}>
      <StatusBar style="dark" />
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#4B5563" }}>
        Quên Mật Khẩu
      </Text>
      <Text style={{ fontSize: 16, color: "#6B7280", textAlign: "center", marginTop: 8 }}>
        Nhập email của bạn để nhận hướng dẫn đặt lại mật khẩu.
      </Text>

      <View style={{ marginTop: 32, gap: 4 }}>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            backgroundColor: "#F3F4F6",
            borderRadius: 20,
          }}
        >
          <Octicons name="mail" size={20} color="gray" />
          <TextInput
            onChangeText={(value) => (emailRef.current = value)}
            style={{
              fontSize: 16,
              flex: 1,
              fontWeight: "600",
              color: "#374151",
              marginLeft: 8,
            }}
            placeholder="Địa chỉ email"
            placeholderTextColor={"gray"}
            keyboardType="email-address"
          />
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        {loading ? (
          <Loading size={40} />
        ) : (
          <TouchableOpacity
            onPress={handleResetPassword}
            style={{
              backgroundColor: "#6366F1",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Đặt lại mật khẩu
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Pressable onPress={() => navigation.navigate("SignIn")}
      style={{
              backgroundColor: "#6366F1",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              marginTop: 16,
            }}>
            
      <Text
              style={{
                fontSize: 18,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Đăng nhập
            </Text>
              </Pressable>
    </View>
  );
}
