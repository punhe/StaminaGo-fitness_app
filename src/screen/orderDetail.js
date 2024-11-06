import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No order found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.orderNumber}>Order #{orderId}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.orderStatus,
              { color: order.isPaid ? "#34C759" : "#FF3B30" },
            ]}
          >
            {order.isPaid ? "✓ PAID" : "UNPAID"}
          </Text>
          {order.isCompleted && (
            <Text style={[styles.completedStatus]}>✓ COMPLETED</Text>
          )}
        </View>

        <View style={styles.divider} />

        <View style={styles.addressSection}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={styles.addressText}>{order.address}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.itemsSection}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                {(item.price * item.quantity).toLocaleString()} đ
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            {order.total.toLocaleString()} đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8E8E93",
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: "#8E8E93",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 16,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 16,
    color: "#8E8E93",
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    overflow: "hidden",
  },
  completedStatus: {
    fontSize: 14,
    fontWeight: "600",
    color: "#34C759",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 16,
  },
  addressSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    color: "#3C3C43",
    lineHeight: 24,
  },
  itemsSection: {
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1C1C1E",
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: "#8E8E93",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
});

export default OrderDetailsScreen;
