import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { Feather, Octicons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Đăng kí", "Làm ơn điền đầy đủ thông tin!");
      return;
    }
    //register process
    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    if (!response.success) {
      Alert.alert("Đăng kí", response.msg);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View
        style={{
          paddingTop: hp(8),
          paddingHorizontal: wp(5),
          flex: 1,
          gap: 12,
        }}
      >
        {/* signIn image */}
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ height: hp(20) }}
            resizeMode="contain"
            source={require("../../assets/images/login.png")}
          />
        </View>
        <View style={{ gap: 10 }}>
          <Text
            style={{
              fontSize: hp(4),
              fontWeight: "bold",
              textAlign: "center",
              color: "#4B5563",
            }}
          >
            Đăng Kí
          </Text>
          {/* inputs */}
          <View style={{ gap: 4 }}>
            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                paddingHorizontal: 16,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (usernameRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  fontWeight: "600",
                  color: "#374151",
                }}
                placeholder="Tên người dùng"
                placeholderTextColor={"gray"}
              />
            </View>
            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                paddingHorizontal: 16,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  fontWeight: "600",
                  color: "#374151",
                }}
                placeholder="Địa chỉ email"
                placeholderTextColor={"gray"}
              />
            </View>

            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                paddingHorizontal: 16,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Octicons name="lock" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (passwordRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  fontWeight: "600",
                  color: "#374151",
                }}
                placeholder="Mật khẩu"
                secureTextEntry
                placeholderTextColor={"gray"}
              />
            </View>
            <View
              style={{
                height: hp(7),
                flexDirection: "row",
                gap: 4,
                paddingHorizontal: 16,
                backgroundColor: "#F3F4F6",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Feather name="image" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(value) => (profileRef.current = value)}
                style={{
                  fontSize: hp(2),
                  flex: 1,
                  fontWeight: "600",
                  color: "#374151",
                }}
                placeholder="Profile Url"
                placeholderTextColor={"gray"}
              />
            </View>

            <View>
              {loading ? (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Loading size={hp(8)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{
                    backgroundColor: "#6366F1", // Equivalent to bg-indigo-500
                    borderRadius: 20, // Equivalent to rounded-xl
                    justifyContent: "center",
                    alignItems: "center",
                    height: hp(6.5),
                  }}
                >
                  <Text
                    style={{
                      fontSize: hp(2.7),
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Đăng kí
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/*sign up text */}
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontWeight: "600",
                  color: "#6B7280",
                }}
              >
                Đã có tài khoản?{" "}
              </Text>
              <Pressable onPress={() => navigation.navigate("SignIn")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "#6366F1",
                  }}
                >
                  Đăng nhập
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
