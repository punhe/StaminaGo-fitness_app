import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';

const CalculatationOTD = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("index");
    }
  };

  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100;

    if (!weightNum || !heightNum || heightNum === 0) {
      Alert.alert("Lỗi", "Vui lòng nhập đúng chiều cao và cân nặng");
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(2));

    if (bmiValue < 18.5) {
      setCategory("Thiếu cân");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory("Bình thường");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory("Thừa cân");
    } else {
      setCategory("Béo phì");
    }
  };

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: "#F3F4F6" }}>
      <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"} Back</Text>
      </Pressable>
      <Text className="text-2xl font-bold text-indigo-500 mb-4">
        Tính toán BMI
      </Text>

      <Text className="text-lg mb-2">Nhập chiều cao (cm):</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          padding: 10,
          backgroundColor: "#FFFFFF",
        }}
        keyboardType="numeric"
        placeholder="Chiều cao (cm)"
        value={height}
        onChangeText={setHeight}
      />

      <Text className="text-lg mt-4 mb-2">Nhập cân nặng (kg):</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 8,
          padding: 10,
          backgroundColor: "#FFFFFF",
        }}
        keyboardType="numeric"
        placeholder="Cân nặng (kg)"
        value={weight}
        onChangeText={setWeight}
      />

      <Pressable
        onPress={calculateBMI}
        className="mt-6 bg-indigo-500 py-3 rounded-lg"
        style={{
          alignItems: "center",
        }}
      >
        <Text className="text-white text-lg font-semibold">Tính BMI</Text>
      </Pressable>

      {bmi && (
        <View style={{ marginTop: 20 }}>
          <Text className="text-xl font-semibold text-indigo-600">
            Chỉ số BMI của bạn: {bmi}
          </Text>
          <Text className="text-lg mt-2">Phân loại: {category}</Text>
        </View>
      )}

      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <Pressable
            onPress={() => navigation.navigate("map")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Map</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("shop")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Cửa hàng</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("chat")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Tin nhắn</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("settings")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CalculatationOTD;

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: colors.white,
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navText: {
    color: "#6366F1", // Indigo-500
    fontWeight: "bold",
    fontSize: 14,
  },
  activeNavText: {
    color: "#4F46E5", // Một tông màu đậm hơn của Indigo cho mục đang active
  },
});
