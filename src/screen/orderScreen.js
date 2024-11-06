import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ORDER_API_URL = "https://mma-be-0n61.onrender.com/api/orders";

const OrdersScreen = () => {
  // Fix: Correct useState usage
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  // Fetch orders from MongoDB
  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(ORDER_API_URL);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Alert.alert(
        "Error",
        "Failed to load orders. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const markOrderAsCompleted = async (orderId) => {
    try {
      const response = await axios.patch(`${ORDER_API_URL}/${orderId}`, {
        isCompleted: true,
        completedAt: new Date().toISOString(),
      });

      if (response.status === 200) {
        // Update local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, isCompleted: true, completedAt: new Date() }
              : order
          )
        );
        Alert.alert("Success", "Order marked as completed!");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      if (error.response?.status === 404) {
        Alert.alert("Error", "Order not found. Please refresh and try again.");
      } else {
        Alert.alert(
          "Error",
          "Failed to update order status. Please try again."
        );
      }
    }
  };

  const confirmOrderCompletion = (orderId) => {
    Alert.alert("Xác nhận", "Bạn đã nhận được đơn hàng này?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Xác nhận",
        onPress: () => markOrderAsCompleted(orderId),
      },
    ]);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("OrderDetail", { orderId: item.id })}
      >
        <Text style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <Text style={styles.orderTotal}>
          Tổng: {(item.total * 100).toLocaleString()} đ
        </Text>
        <Text
          style={[styles.orderStatus, { color: item.isPaid ? "green" : "red" }]}
        >
          {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
        </Text>
        {item.isCompleted && (
          <Text style={[styles.orderStatus, { color: "green" }]}>
            Đã nhận hàng
          </Text>
        )}
        <Text style={styles.orderAddress}>Địa chỉ: {item.address}</Text>
      </TouchableOpacity>

      {!item.isCompleted && item.isPaid && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => confirmOrderCompletion(item.id)}
        >
          <Text style={styles.completeButtonText}>Đã nhận hàng</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyMessage}>Bạn chưa có đơn hàng nào.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đơn hàng của bạn</Text>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        refreshing={isLoading}
        onRefresh={fetchOrders}
        contentContainerStyle={styles.listContainer}
      />

      <Pressable style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Quay lại giỏ hàng</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  listContainer: {
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#3F51B5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderTotal: {
    fontSize: 14,
    marginTop: 5,
  },
  orderStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  orderAddress: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  completeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OrdersScreen;
