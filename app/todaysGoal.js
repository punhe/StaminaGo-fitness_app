import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const TodaysGoals = () => {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([
    { id: 1, title: "Chạy bộ 5km", completed: false },
    { id: 2, title: "50 lần hít đất", completed: false },
    { id: 3, title: "Uống 2 lít nước", completed: true },
    { id: 4, title: "Tập yoga 30 phút", completed: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState("");

  const toggleGoal = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const addGoal = () => {
    if (newGoal.trim() !== "") {
      setGoals([
        ...goals,
        { id: goals.length + 1, title: newGoal, completed: false },
      ]);
      setNewGoal("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mục tiêu hôm nay</Text>

      <ScrollView style={styles.scrollView}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[styles.goalItem, goal.completed && styles.completedGoal]}
            onPress={() => toggleGoal(goal.id)}
          >
            <Text
              style={[
                styles.goalText,
                goal.completed && styles.completedGoalText,
              ]}
            >
              {goal.title}
            </Text>
            <Text style={styles.checkmark}>{goal.completed ? "✓" : ""}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Thêm mục tiêu mới</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setNewGoal}
              value={newGoal}
              placeholder="Nhập mục tiêu mới"
            />
            <TouchableOpacity style={styles.modalButton} onPress={addGoal}>
              <Text style={styles.textStyle}>Thêm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomNav}>
        <View style={styles.bottomNavContent}>
          <Pressable
            onPress={() => navigation.navigate("mealPlanner")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="utensils" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">Bữa ăn</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("shop")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="shopping-bag" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">
              Cửa hàng
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("chat")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="comment-alt" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">
              Tin nhắn
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("settings")}
            style={styles.footerItem}
          >
            <FontAwesome5 name="cog" size={24} color="#4F46E5" />
            <Text className="text-indigo-500 font-bold text-base">Cài đặt</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  goalItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  completedGoal: {
    backgroundColor: "#e6ffe6",
  },
  goalText: {
    fontSize: 16,
    color: "#333",
  },
  completedGoalText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  checkmark: {
    fontSize: 20,
    color: "#4CAF50",
  },
  addButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  bottomNavContent: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  navText: {
    color: "#6366F1",
    fontWeight: "bold",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: "#6366F1",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: "#FF6347",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default TodaysGoals;
