import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import colors from "../../colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

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
    <View style={styles.container}>
      {/* <Pressable onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"} Back</Text>
      </Pressable> */}

      <View style={styles.content}>
        <Text style={styles.title}>Tính toán BMI</Text>

        <Text style={styles.label}>Nhập chiều cao (cm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Chiều cao (cm)"
          value={height}
          onChangeText={setHeight}
        />

        <Text style={styles.label}>Nhập cân nặng (kg):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Cân nặng (kg)"
          value={weight}
          onChangeText={setWeight}
        />

        <Pressable onPress={calculateBMI} style={styles.calculateButton}>
          <Text style={styles.calculateButtonText}>Tính BMI</Text>
        </Pressable>

        {bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Chỉ số BMI của bạn: {bmi}</Text>
            <Text style={styles.categoryText}>Phân loại: {category}</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <Pressable
            onPress={() => navigation.navigate("Map")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="map-marker-alt" size={24} color="#4F46E5" />
            <Text style={styles.navText}>Map</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Shop")}
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
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#F3F4F6",
    justifyContent: "space-between",
  },
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginBottom: 16,
  },
  calculateButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  calculateButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  categoryText: {
    fontSize: 18,
    marginTop: 8,
    color: "#374151",
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
  footerItem: {
    alignItems: "center",
  },
  navText: {
    color: "#6366F1",
    fontWeight: "bold",
    fontSize: 14,
  },
  activeNavText: {
    color: "#4F46E5",
  },
});
