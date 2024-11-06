import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Notifications from "expo-notifications";
import { CartContext } from "../context/cartContext";
import { OrderContext } from "../context/orderContext";
import { ProductContext } from "../context/productContext";

const SHIPPING_FEE = 20;
const ORDER_API_URL = "https://mma-be-0n61.onrender.com/api/orders";

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Order = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart, removeFromCartt, placeOrder } =
    useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const { updateProductQuantity } = useContext(ProductContext);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Request notification permissions
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
    } catch (error) {
      console.log("Error requesting notification permissions:", error);
    }
  };

  const sendOrderNotification = async (orderId) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Đặt hàng thành công! 🎉",
          body: `Đơn hàng #${orderId} đã được xác nhận. Cảm ơn bạn đã mua hàng!`,
          data: { orderId },
        },
        trigger: null, // Show immediately
      });
    } catch (error) {
      console.log("Error sending notification:", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(" đ", ""));
    return sum + price;
  }, 0);
  const total = subtotal + SHIPPING_FEE;

  const handleCreateOrder = async (orderId) => {
    if (!address) {
      Alert.alert("Error", "Please enter your address.");
      return;
    }

    const newOrder = {
      id: orderId,
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),
      total: Math.round(parseFloat(total) * 1000),
      isPaid: false,
      address: address,
    };

    try {
      if (isNaN(newOrder.total)) {
        throw new Error("Invalid order total");
      }
      const response = await axios.post(ORDER_API_URL, newOrder);
      if (response.status === 201) {
        addOrder(newOrder);
        cartItems.forEach((item) => {
          removeFromCartt(item);
        });

        // Send notification after successful order
        await sendOrderNotification(orderId);

        Alert.alert("Order Created", "Your order was placed successfully!");
        clearCart();
        navigation.navigate("Orders");
      } else {
        Alert.alert("Error", "Failed to create order.");
      }
    } catch (error) {
      Alert.alert("Error", "There was an error");
    }
  };

  const handleMoMoPayment = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://mma-be-0n61.onrender.com/api/payment",
        {
          amount: total * 1000,
          orderInfo: `Thanh toán đơn hàng ${orderId}`,
        }
      );

      if (response.data && response.data.payUrl) {
        await handleCreateOrder(orderId);
        await Linking.openURL(response.data.payUrl);
      } else {
        Alert.alert("Lỗi", "Không thể tạo liên kết thanh toán");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = () => {
    const orderId = new Date().getTime().toString();
    Alert.alert(
      "Xác nhận đặt hàng",
      "Bạn muốn thanh toán bằng phương thức nào?",
      [
        {
          text: "Thanh toán khi nhận hàng",
          onPress: () => handleCreateOrder(orderId),
        },
        {
          text: "Thanh toán MoMo",
          onPress: () => handleMoMoPayment(orderId),
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
      <TextInput
        style={styles.addressInput}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Subtotal: {subtotal.toFixed(3)} đ
        </Text>
        <Text style={styles.summaryText}>Shipping: 20,000 đ</Text>
        <Text style={styles.totalText}>Total: {total.toFixed(3)} đ</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Processing..." : "Place Order"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Cart")}
        >
          <Text style={styles.buttonText}>Back to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  addressInput: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 20,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#3F51B5",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default Order;
