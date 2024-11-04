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
import { Octicons } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Đăng nhập", "Làm ơn điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (response.success) {
      navigation.navigate("Home"); // Điều hướng đến trang "Home" sau khi đăng nhập thành công
    } else {
      Alert.alert("Đăng nhập", response.msg);
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
            style={{ height: hp(25) }}
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
            Đăng Nhập
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
            <View style={{ gap: 3 }}>
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
              <Text
                style={{
                  fontSize: hp(1.8),
                  fontWeight: "600",
                  textAlign: "right",
                  color: "#4B5563",
                }}
              >
                Quên mật khẩu?
              </Text>
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
                  onPress={handleLogin}
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
                    Đăng nhập
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
                Chưa có tài khoản?{" "}
              </Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={{
                    fontSize: hp(1.8),
                    fontWeight: "bold",
                    color: "#6366F1",
                  }}
                >
                  Đăng ký
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
