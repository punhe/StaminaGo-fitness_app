import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import { OrderContext } from "../context/orderContext";
import { ProductContext } from "../context/productContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SHIPPING_FEE = 20000;
const ORDER_API_URL = "https://mma-be-0n61.onrender.com/api/orders";

const Order = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart, removeFromCartt } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(false);
  const { updateProductQuantity } = useContext(ProductContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(" đ", ""));
      return sum + price;
    }, 0);
  }, [cartItems]);

  const total = subtotal + SHIPPING_FEE;

  const updateProductQuantities = () => {
    cartItems.forEach((item) => {
      updateProductQuantity(item.id, item.quantity);
      removeFromCartt(item.id, item.quantity);
    });
  };

  const handleCreateOrder = async (orderId) => {
    try {
      const newOrder = {
        id: orderId,
        items: cartItems,
        total: total,
        date: new Date(),
        isPaid: false,
      };

      // First create order in backend
      const response = await axios.post(ORDER_API_URL, newOrder);

      if (response.status === 201) {
        // Then add to local storage via context
        addOrder(newOrder);
        updateProductQuantities();
        Alert.alert("Order Created", "Your order was placed successfully!");
        clearCart();
        navigation.navigate("orderScreen");
      } else {
        Alert.alert("Error", "Failed to create order.");
      }
    } catch (error) {
      console.error("Order creation error:", error);
      Alert.alert("Error", "An error occurred while creating the order.");
    }
  };

  const handleMoMoPayment = async (orderId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://mma-be-0n61.onrender.com/api/payment",
        {
          amount: total.toString(),
          orderInfo: `Thanh toán đơn hàng${orderId}`,
        }
      );

      if (response.data && response.data.payUrl) {
        await handleCreateOrder(orderId);
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

  // Return statement remains the same
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View className="items-center">
        <Image
          style={{ height: hp(40), margin: "auto" }}
          resizeMode="contain"
          source={require("../../assets/images/login.png")}
        />
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePlaceOrder}
          disabled={isLoading}
        >
          <Text style={styles.text}>
            {isLoading ? "Đang xử lý..." : "Đặt hàng"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.text}>Quay lại giỏ hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("orderScreen")}
        >
          <Text style={styles.text}>Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    padding: 10,
    justifyContent: "flex-end",
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
