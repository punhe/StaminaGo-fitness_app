import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import { OrderContext } from "../context/orderContext";
import { ProductContext } from "../context/productContext";

const SHIPPING_FEE = 20000;

const Order = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart } = useContext(CartContext);
  const { addOrder, updateOrderStatus } = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProductQuantity } = useContext(ProductContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0);
  }, [cartItems]);

  const total = subtotal + SHIPPING_FEE;

  const updateProductQuantities = () => {
    cartItems.forEach((item) => {
      console.log(item);
      updateProductQuantity(item.id, -item.quantity);
    });
  };

  const handleMoMoPayment = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://your-server-url:5000/payment", {
        amount: total.toString(),
        orderInfo: "Thanh toán đơn hàng",
      });

      if (response.data && response.data.payUrl) {
        const orderId = new Date().getTime().toString();
        addOrder({
          id: orderId,
          items: cartItems,
          total: total,
          date: new Date(),
          isPaid: false,
        });
        updateProductQuantities();
        await Linking.openURL(response.data.payUrl);
      } else {
        Alert.alert("Lỗi", "Không thể tạo liên kết thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      "Xác nhận đặt hàng",
      "Bạn muốn thanh toán bằng phương thức nào?",
      [
        {
          text: "Thanh toán khi nhận hàng",
          onPress: () => {
            const orderId = new Date().getTime().toString();
            addOrder({
              id: orderId,
              items: cartItems,
              total: total,
              date: new Date(),
              isPaid: false,
            });
            updateProductQuantities();
            Alert.alert(
              "Đã đặt hàng",
              `Đơn hàng của bạn trị giá ${total.toFixed(
                2
              )}đ đã được đặt thành công!`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    clearCart();
                    navigation.navigate("orders");
                  },
                },
              ]
            );
          },
        },
        {
          text: "Thanh toán MoMo",
          onPress: handleMoMoPayment,
        },
        {
          text: "Hủy",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* ... (phần code hiển thị không thay đổi) ... */}
      <Button
        title={isLoading ? "Đang xử lý..." : "Đặt hàng"}
        onPress={handlePlaceOrder}
        disabled={isLoading}
      />
      <Button title="Quay lại giỏ hàng" onPress={() => navigation.goBack()} />
      <Button
        title="Xem đơn hàng"
        onPress={() => navigation.navigate("orders")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Order;
