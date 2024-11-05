import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const activities = [
  {
    id: '1',
    name: 'Đá bóng',
    info: 'Đá bóng là một môn thể thao đồng đội.',
    calories: 'Khoảng 728 calo/giờ',
    bestTime: 'Buổi chiều',
    foods: ['Nước dừa', 'Bánh mì', 'Trái cây tươi'],
    image: 'https://i.pinimg.com/236x/47/b1/08/47b108db59b56612ebe99e422ceef046.jpg'
  },
  {
    id: '2',
    name: 'Chạy bộ',
    info: 'Chạy bộ là một hình thức tập luyện thể dục.',
    calories: 'Khoảng 755 calo/giờ',
    bestTime: 'Buổi sáng hoặc chiều',
    foods: ['Bánh yến mạch', 'Nước chanh muối', 'Chuối'],
    image: 'https://i.pinimg.com/236x/c8/34/7a/c8347a3f2dac4b232373865b792a59b1.jpg'
  },
  {
    id: '3',
    name: 'Cầu lông',
    info: 'Cầu lông là môn thể thao đối kháng.',
    calories: 'Khoảng 400 calo/giờ',
    bestTime: 'Buổi chiều',
    foods: ['Nước ép trái cây', 'Sữa chua', 'Trái cây khô'],
    image: 'https://i.pinimg.com/236x/22/77/54/22775473b3b622d38a4ad395a1b97282.jpg'
  },
  {
    id: '4',
    name: 'Bóng chuyền',
    info: 'Bóng chuyền là môn thể thao đồng đội.',
    calories: 'Khoảng 600 calo/giờ',
    bestTime: 'Buổi chiều',
    foods: ['Nước dừa', 'Bánh mì kẹp thịt', 'Trái cây tươi'],
    image: 'https://i.pinimg.com/236x/6f/1f/da/6f1fda0432f121ec94458e52ccbb8004.jpg'
  },
  {
    id: '5',
    name: 'Bóng rổ',
    info: 'Bóng rổ là môn thể thao đồng đội.',
    calories: 'Khoảng 728 calo/giờ',
    bestTime: 'Buổi chiều',
    foods: ['Nước ép trái cây', 'Sữa chua', 'Bánh năng lượng'],
    image: 'https://i.pinimg.com/236x/97/44/19/97441974ab47a75b3e5237706212bfa2.jpg'
  },
  {
    id: '6',
    name: 'Đạp xe',
    info: 'Đạp xe là một hoạt động thể dục tuyệt vời cho sức khỏe tim mạch.',
    calories: 'Khoảng 500 calo/giờ',
    bestTime: 'Buổi sáng hoặc chiều',
    foods: ['Nước dừa', 'Bánh mì ngũ cốc', 'Trái cây tươi'],
    image: 'https://i.pinimg.com/236x/89/78/eb/8978ebb46f6678a3f94358e0f45bf063.jpg'
  }
];

export default function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các hoạt động thể thao</Text>

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={activities}
        labelField="name"
        valueField="id"
        placeholder="Chọn hoạt động"
        value={selectedActivity}
        onChange={item => {
          setSelectedActivity(item.id);
        }}
      />

      {/* Hiển thị thông tin chi tiết và hình ảnh */}
      {selectedActivity && (
        <View style={styles.detailsContainer}>
          <Image 
            source={{ uri: activities.find(activity => activity.id === selectedActivity).image }} 
            style={styles.image} 
          />
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              {activities.find(activity => activity.id === selectedActivity).info}
            </Text>
            <Text style={styles.caloriesText}>
              Calo tiêu hao: {activities.find(activity => activity.id === selectedActivity).calories}
            </Text>
            <Text style={styles.bestTimeText}>
              Thời gian tốt nhất để chơi: {activities.find(activity => activity.id === selectedActivity).bestTime}
            </Text>
            <Text style={styles.foodsText}>
              Đồ ăn thức uống liên quan trước khi chơi:
              {' '}
              {activities.find(activity => activity.id === selectedActivity).foods.join(', ')}
            </Text>
          </View>
        </View>
      )}

      {/* Các nút cho hoạt động */}
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable 
            style={[styles.activityItem, selectedActivity === item.id && styles.activeButton]} 
            onPress={() => setSelectedActivity(item.id)}
          >
            <Text style={styles.activityText}>{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdown: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color:'#999',
  },
  selectedTextStyle:{
     fontSize :16,
     color :'#000',

   },
   detailsContainer:{
     alignItems:"center",
     marginBottom :20,

   },
   image:{
     width :150,
     height :150,
     marginBottom :10,
     borderRadius :10,

   },
   infoBox:{
     borderWidth :1,
     borderColor : "#ccc",
     borderRadius :10,
     padding :15,
     backgroundColor :"#fff",
     width :"100%",
     shadowColor :"#000",
     shadowOffset :{ width :0, height :2},
     shadowOpacity :0.2,
     shadowRadius :2,
     elevation :2
   },
   infoText:{
     fontSize :16,
     textAlign :"center",
     marginBottom :10
   },
   caloriesText:{
     fontSize :16,
     textAlign :"center",
     marginBottom :10
   },
   bestTimeText:{
     fontSize :16,
     textAlign :"center",
     marginBottom :10
   },
   foodsText:{
     fontSize :16,
     textAlign :"center",
     marginBottom :10
   },
   activityItem:{
     backgroundColor:"#6366f1",
     borderRadius :10,
     paddingVertical :15,
     paddingHorizontal :20,
     marginBottom :15,
     elevation :3
   },
   activeButton:{
     backgroundColor:"#34d399",
   },
   activityText:{
     color:"white",
     fontSize :18,
     textAlign :"center"
   }
});