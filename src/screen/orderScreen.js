import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ORDER_API_URL = "https://mma-be-0n61.onrender.com/api/orders";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

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
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, isCompleted: true, completedAt: new Date() }
              : order
          )
        );
        Alert.alert("Thành công", "Đã cập nhật trạng thái đơn hàng!");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      if (error.response?.status === 404) {
        Alert.alert("Lỗi", "Không tìm thấy đơn hàng. Vui lòng thử lại.");
      } else {
        Alert.alert(
          "Lỗi",
          "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại."
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
    <View style={styles.orderCard}>
      <TouchableOpacity
        style={styles.orderContent}
        onPress={() => navigation.navigate("OrderDetail", { orderId: item.id })}
      >
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderNumber}>Đơn hàng #{item.id}</Text>
            <Text style={styles.orderDate}>
              {new Date(item.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: item.isPaid ? "#E8F5E9" : "#FFEBEE" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: item.isPaid ? "#2E7D32" : "#C62828" },
                ]}
              >
                {item.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </Text>
            </View>
            {item.isCompleted && (
              <View
                style={[styles.statusBadge, { backgroundColor: "#E8F5E9" }]}
              >
                <Text style={[styles.statusText, { color: "#2E7D32" }]}>
                  ✓ Đã nhận hàng
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.orderDetails}>
          <View style={styles.addressContainer}>
            <Text style={styles.addressLabel}>Địa chỉ giao hàng:</Text>
            <Text style={styles.addressText}>{item.address}</Text>
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Tổng tiền:</Text>
            <Text style={styles.totalAmount}>
              {item.total.toLocaleString()} đ
            </Text>
          </View>
        </View>

        {!item.isCompleted && item.isPaid && (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={() => confirmOrderCompletion(item.id)}
          >
            <Text style={styles.completeButtonText}>Xác nhận đã nhận hàng</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Chưa có đơn hàng nào</Text>
      <Text style={styles.emptyMessage}>
        Các đơn hàng của bạn sẽ xuất hiện ở đây
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Đơn hàng của bạn</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyList}
        refreshing={isLoading}
        onRefresh={fetchOrders}
        contentContainerStyle={styles.listContainer}
      />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Quay lại giỏ hàng</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F7",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1C1C1E",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderContent: {
    padding: 16,
  },
  orderHeader: {
    flexDirection: "column",
    gap: 12,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  orderDate: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5EA",
    marginVertical: 16,
  },
  orderDetails: {
    gap: 16,
  },
  addressContainer: {
    gap: 4,
  },
  addressLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  addressText: {
    fontSize: 16,
    color: "#1C1C1E",
    lineHeight: 22,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#007AFF",
  },
  completeButton: {
    backgroundColor: "#34C759",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default OrdersScreen;
