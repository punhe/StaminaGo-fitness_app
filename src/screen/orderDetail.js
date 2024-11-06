import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import axios from "axios";

const ORDER_API_URL = "https://mma-be-0n61.onrender.com/api/orders";

const OrderDetailsScreen = ({ route }) => {
  const { orderId } = route.params;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${ORDER_API_URL}/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      Alert.alert(
        "Error",
        "Failed to load order details. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Loading order details...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.orderDate}>
        Order Placed: {new Date(order.date).toLocaleDateString()}
      </Text>
      <Text style={styles.orderTotal}>
        Total: {order.total.toLocaleString()} đ
      </Text>
      <Text
        style={[styles.orderStatus, { color: order.isPaid ? "green" : "red" }]}
      >
        {order.isPaid ? "Paid" : "Unpaid"}
      </Text>
      {order.isCompleted && (
        <Text style={[styles.orderStatus, { color: "green" }]}>
          Order Completed
        </Text>
      )}
      <Text style={styles.orderAddress}>Shipping Address: {order.address}</Text>

      <View style={styles.itemsContainer}>
        <Text style={styles.sectionTitle}>Items</Text>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>
              {(item.price * item.quantity).toLocaleString()} đ
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderTotal: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderAddress: {
    fontSize: 16,
    marginBottom: 20,
  },
  itemsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemQuantity: {
    fontSize: 16,
  },
});

export default OrderDetailsScreen;
