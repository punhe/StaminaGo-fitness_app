import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const CalculatationOTD = () => {
  // State để lưu chiều cao, cân nặng và kết quả BMI
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  // Hàm tính chỉ số BMI
  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // chuyển cm sang mét

    if (!weightNum || !heightNum || heightNum === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập đúng chiều cao và cân nặng');
      return;
    }

    const bmiValue = weightNum / (heightNum * heightNum);
    setBmi(bmiValue.toFixed(2)); // làm tròn kết quả

    // Xác định phân loại BMI
    if (bmiValue < 18.5) {
      setCategory('Thiếu cân');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Bình thường');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Thừa cân');
    } else {
      setCategory('Béo phì');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nhập chiều cao (cm):</Text>
      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        keyboardType="numeric"
        placeholder="Chiều cao (cm)"
        value={height}
        onChangeText={setHeight}
      />

      <Text>Nhập cân nặng (kg):</Text>
      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
        keyboardType="numeric"
        placeholder="Cân nặng (kg)"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Tính BMI" onPress={calculateBMI} />

      {/* Hiển thị kết quả BMI */}
      {bmi && (
        <View style={{ marginTop: 20 }}>
          <Text>Chỉ số BMI của bạn: {bmi}</Text>
          <Text>Phân loại: {category}</Text>
        </View>
      )}
    </View>
  );
};

export default CalculatationOTD;
