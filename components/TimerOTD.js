import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';

const TimerOTD = () => {
  // State để lưu số giây còn lại, trạng thái bắt đầu đếm và danh sách bài tập
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);

  // Danh sách các bài tập tương ứng với thời gian và số lần thực hiện
  const exercises = {
    1: [
      { name: 'Bài tập về hít thở (tập nín thở trong 30s)', reps: 2 },
      { name: 'Chống đẩy', reps: 10 },
      { name: 'Squat', reps: 15 },
      { name: 'Plank ( 2 lần plank, mỗi lần 30s )', reps: 2 },// 2 lần plank, mỗi lần khoảng 30s
      
    ],
    5: [
      { name: 'Gập bụng', reps: 30 },
      { name: 'Chống đẩy', reps: 30 },
      { name: 'Nhảy dây', reps: 100 },
      
    ],
    10: [
      { name: 'Chạy tại chỗ (5p), chạy nâng cao đùi (5p)', reps: 1 }, // 5 phút chạy tại chỗ
      { name: 'Squat', reps: 40 },
      { name: 'Burpees ( 1 chuỗi bài tập liên tiếp về giảm calo )', reps: 2 },
      
    ],
    20: [
      { name: 'Các động tác Cardio', reps: 10 }, // 10 phút cardio
      { name: 'Các động tác Lunges', reps: 50 },
      { name: 'Yoga cơ bản', reps: 5 }, // 5 lần chuỗi động tác yoga chào mặt trời
      
    ],
    30: [
      { name: 'Thiền', reps: 1 }, // 15 phút HIIT
      { name: 'Yoga nâng cao', reps: 1 }, // 5 lần bài tập yoga nâng cao
      { name: 'Chạy bộ', reps: 2 }, // 30 phút chạy bộ
      
    ],
  };

  // useEffect để cập nhật bộ đếm mỗi giây
  useEffect(() => {
    let interval;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      // Khi thời gian hết, hiển thị thông báo và dừng bộ đếm
      Alert.alert('Hết thời gian', 'Thời gian đã kết thúc!');
      setIsRunning(false);
    }

    // Dọn dẹp interval khi component unmount hoặc khi đếm dừng
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  // Hàm để bắt đầu đếm với thời gian cài đặt
  const startTimer = (minutes) => {
    setSecondsRemaining(minutes * 60); // Chuyển phút thành giây
    setIsRunning(true);
    setExerciseList(exercises[minutes] || []); // Lấy danh sách bài tập tương ứng
  };

  // Chuyển đổi giây thành phút và giây
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <ScrollView>
      <View>
        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Thời gian còn lại: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>

        {/* Các nút để chọn thời gian đếm */}
        <Button title="Đặt 1 phút" onPress={() => startTimer(1)} />
        <Button title="Đặt 5 phút" onPress={() => startTimer(5)} />
        <Button title="Đặt 10 phút" onPress={() => startTimer(10)} />
        <Button title="Đặt 20 phút" onPress={() => startTimer(20)} />
        <Button title="Đặt 30 phút" onPress={() => startTimer(30)} />

        {/* Hiển thị danh sách các bài tập và số lần thực hiện */}
        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Gợi ý Bài tập và số lần thực hiện:</Text>
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise, index) => (
            <Text key={index}>- {exercise.name}: {exercise.reps} lần</Text>
          ))
        ) : (
          <Text>Chưa có bài tập nào</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TimerOTD;



