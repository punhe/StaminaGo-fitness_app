import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../colors"; // Ensure you have defined colors
import colors from "../../colors";
import { FontAwesome5 } from "@expo/vector-icons";

const TimerOTD = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);
  const [selectedMinutes, setSelectedMinutes] = useState(null);

  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("index");
    }
  };

  const exercises = {
    1: [
      { name: "Bài tập về hít thở (tập nín thở trong 30s)", reps: 2 },
      { name: "Chống đẩy", reps: 10 },
      { name: "Squat", reps: 15 },
      { name: "Plank (2 lần plank, mỗi lần 30s)", reps: 2 },
    ],
    5: [
      { name: "Gập bụng", reps: 30 },
      { name: "Chống đẩy", reps: 30 },
      { name: "Nhảy dây", reps: 100 },
    ],
    10: [
      { name: "Chạy tại chỗ (5p), chạy nâng cao đùi (5p)", reps: 1 },
      { name: "Squat", reps: 40 },
      { name: "Burpees (1 chuỗi bài tập liên tiếp về giảm calo)", reps: 2 },
    ],
    20: [
      { name: "Các động tác Cardio", reps: 10 },
      { name: "Các động tác Lunges", reps: 50 },
      { name: "Yoga cơ bản", reps: 5 },
    ],
    30: [
      { name: "Thiền", reps: 1 },
      { name: "Yoga nâng cao", reps: 1 },
      { name: "Chạy bộ", reps: 2 },
    ],
  };

  useEffect(() => {
    let interval;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      Alert.alert("Hết thời gian", "Thời gian đã kết thúc!");
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  const selectTimer = (minutes) => {
    setSelectedMinutes(minutes);
    setSecondsRemaining(minutes * 60);
    setExerciseList(exercises[minutes] || []);
    
    // Dừng nếu đang chạy
    if (isRunning) {
      setIsRunning(false); 
    }
  };

  const startTimer = () => {
    if (selectedMinutes) {
      setIsRunning(true);
    } else {
      Alert.alert("Chưa chọn thời gian", "Vui lòng chọn một mốc thời gian trước khi bắt đầu.");
    }
  };

  const resetTimer = () => {
    if (selectedMinutes) {
      setSecondsRemaining(selectedMinutes * 60);
    } else {
      setSecondsRemaining(0);
    }
    setIsRunning(false);
    setExerciseList([]);
  };

  const pauseTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.timerText}>
          Thời gian còn lại: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </Text>

        <View style={styles.buttonContainer}>
          {[1, 5, 10, 20, 30].map((minute) => (
            <Pressable
              key={minute}
              onPress={() => selectTimer(minute)}
              style={styles.timeButton}
            >
              <Text style={styles.buttonText}>{minute} phút</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.controlContainer}>
          <Pressable onPress={startTimer} style={styles.startButton}>
            <Text style={styles.controlButtonText}>Start</Text>
          </Pressable>
          <Pressable onPress={pauseTimer} style={styles.pauseButton}>
            <Text style={styles.pauseButtonText}>{isRunning ? 'Pause' : 'Resume'}</Text>
          </Pressable>
          <Pressable onPress={resetTimer} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>

        <Text style={styles.exerciseHeader}>
          Gợi ý bài tập và số lần thực hiện:
        </Text>
        {exerciseList.length > 0 ? (
          exerciseList.map((exercise, index) => (
            <Text key={index} style={styles.exerciseText}>
              - {exercise.name}: {exercise.reps} lần
            </Text>
          ))
        ) : (
          <Text style={styles.noExerciseText}>Chưa có bài tập nào</Text>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <FooterButton icon="map-marker-alt" text="Map" navigateTo="Map" />
          <FooterButton icon="shopping-bag" text="Cửa hàng" navigateTo="Shop" />
          <FooterButton icon="comment-alt" text="Tin nhắn" navigateTo="chat" />
          <FooterButton icon="cog" text="Cài đặt" navigateTo="settings" />
        </View>
      </View>
    </View>
  );
};

const FooterButton = ({ icon, text, navigateTo }) => {
const navigation = useNavigation();
return (
<Pressable
onPress={() => navigation.navigate(navigateTo)}
style={styles.footerItem}
>
<FontAwesome5 name={icon} size={24} color="#4F46E5" />
<Text style={styles.footerText}>{text}</Text>
</Pressable>
);
};

const styles = StyleSheet.create({
container: {
flex:1,
},
scrollViewContent:{
padding :20,
flexGrow :1,
justifyContent :"center",
alignItems :"center",
},
backButton:{
position :"absolute",
top :30,
left :10,
zIndex :1,
},
backButtonText:{
fontSize :18,
color :colors.white,
},
timerText:{
fontSize :24,
fontWeight :"bold",
color :"#4F46E5",
marginBottom :20,
textAlign :"center",
},
buttonContainer:{
flexDirection :"row",
justifyContent :"space-between",
marginBottom :20,
},
timeButton:{
backgroundColor:"#4F46E5",
paddingVertical :10,
paddingHorizontal :15,
borderRadius :5,
marginHorizontal :5,
},
buttonText:{
color :"white",
fontWeight :"bold",
},
controlContainer:{
flexDirection :"row",
justifyContent :"space-around",
marginBottom :20,
},
startButton:{
backgroundColor:"#A9A9A9",
paddingVertical :12,
paddingHorizontal :20,
borderRadius :8,
marginHorizontal :5,
shadowColor:"#000",
shadowOffset:{
width :0,
height :2,
},
shadowOpacity :0.25,
shadowRadius :3.84,
elevation :5,
},
controlButtonText:{
color :"white",
fontWeight :"bold",
},
pauseButton:{
backgroundColor:"#FFA500",
paddingVertical :12,
paddingHorizontal :20,
borderRadius :8,
marginHorizontal :5,
shadowColor:"#000",
shadowOffset:{
width :0,
height :2,
},
shadowOpacity :0.25,
shadowRadius :3.84,
elevation :5,
},
pauseButtonText:{
color :"white",
fontWeight :"bold",
},
resetButton:{
backgroundColor:"#FF3B30",
paddingVertical :12,
paddingHorizontal :20,
borderRadius :8,
marginHorizontal :5,
shadowColor:"#000",
shadowOffset:{
width :0,
height :2,
},
shadowOpacity :0.25,
shadowRadius :3.84,
elevation :5,
},
resetButtonText:{
color :"white",
fontWeight :"bold",
},
exerciseHeader:{
fontSize :18,
fontWeight :"600",
color:"#4F46E5",
marginBottom :10,
textAlign :"left",
},
exerciseText:{
fontSize :16,
marginBottom :5,
textAlign :"left",
width :"100%",
},
noExerciseText:{
fontSize :16,
textAlign :"center",
color:"#999",
},
footer:{
borderTopWidth :1,
borderTopColor:"#e5e7eb",
paddingVertical :10,
backgroundColor:"#ffffff",
},
footerContainer:{
flexDirection :"row",
justifyContent :"space-around",
},
footerItem:{
alignItems :"center",
},
footerText:{
color:"#4F46E5",
fontSize :12,
marginTop :5,
},
});

export default TimerOTD;
