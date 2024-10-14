import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

const MealPlanner = () => {
  const navigation = useNavigation();
  const [meals, setMeals] = useState([
    { id: 1, name: "Bữa sáng", foods: [{ name: "Bánh mì", calories: 200 }], totalCalories: 200 },
    { id: 2, name: "Bữa trưa", foods: [{ name: "Cơm gà", calories: 500 }], totalCalories: 500 },
    { id: 3, name: "Bữa tối", foods: [{ name: "Salad", calories: 300 }], totalCalories: 300 },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);
  const [newFood, setNewFood] = useState({ name: "", calories: "" });

  const addFood = () => {
    if (newFood.name && newFood.calories && selectedMealId) {
      const calories = parseInt(newFood.calories);
      setMeals(meals.map(meal => {
        if (meal.id === selectedMealId) {
          const updatedFoods = [...meal.foods, { name: newFood.name, calories }];
          const totalCalories = updatedFoods.reduce((sum, food) => sum + food.calories, 0);
          return { ...meal, foods: updatedFoods, totalCalories };
        }
        return meal;
      }));
      setNewFood({ name: "", calories: "" });
      setModalVisible(false);
    }
  };

  const getTotalDailyCalories = () => {
    return meals.reduce((sum, meal) => sum + meal.totalCalories, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kế hoạch ăn uống</Text>
      
      <ScrollView style={styles.scrollView}>
        {meals.map((meal) => (
          <View key={meal.id} style={styles.mealContainer}>
            <Text style={styles.mealTitle}>{meal.name} - {meal.totalCalories} calo</Text>
            {meal.foods.map((food, index) => (
              <Text key={index} style={styles.foodItem}>
                {food.name} - {food.calories} calo
              </Text>
            ))}
            <TouchableOpacity
              style={styles.addFoodButton}
              onPress={() => {
                setSelectedMealId(meal.id);
                setModalVisible(true);
              }}
            >
              <Text style={styles.addFoodButtonText}>+ Thêm món ăn</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Tổng calo trong ngày: {getTotalDailyCalories()}
        </Text>
      </View>

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
              onChangeText={(text) => setNewFood({ ...newFood, name: text })}
              value={newFood.name}
              placeholder="Tên món ăn"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setNewFood({ ...newFood, calories: text })}
              value={newFood.calories}
              placeholder="Số calo"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalButton} onPress={addFood}>
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
       
          <TouchableOpacity onPress={() => navigation.navigate("todaysGoal")}>
            <Text style={styles.navText}>Mục tiêu</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.navText, styles.activeNavText]}>Bữa ăn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("profile")}>
            <Text style={styles.navText}>Hồ sơ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("settings")}>
            <Text style={styles.navText}>Cài đặt</Text>
          </TouchableOpacity>
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
  mealContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  mealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  foodItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  addFoodButton: {
    backgroundColor: "#6366F1",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addFoodButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  summaryContainer: {
    backgroundColor: "#e6ffe6",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
  activeNavText: {
    color: "#4CAF50",
  },
});

export default MealPlanner;