import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
  Linking,
  TouchableOpacity,
  Image,
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

const Order = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart, removeFromCartt } = useContext(CartContext);
  const { addOrder, updateOrderStatus } = useContext(OrderContext);
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
      console.log(item);
      removeFromCartt(item.id, item.quantity);
    });
  };

  const handleMoMoPayment = async () => {
    setIsLoading(true);
    try {
      // Send the payment request to your backend
      const response = await axios.post(
        "https://apply-momo-to-order.onrender.com/payment",
        {
          amount: total.toString(), // Ensure 'total' is being passed as a string
          orderInfo: "Thanh toán đơn hàng", // Order info for MoMo
        }
      );

      // Check if the response contains the payUrl
      if (response.data && response.data.payUrl) {
        const orderId = new Date().getTime().toString(); // Generate a unique orderId

        // Save the order in your state or database
        addOrder({
          id: orderId,
          items: cartItems,
          total: total,
          date: new Date(),
          isPaid: false, // Order is not yet paid
        });

        // Redirect the user to the payment URL
        await Linking.openURL(response.data.payUrl);
      } else {
        // If payUrl is missing in the response, show an alert
        Alert.alert("Lỗi", "Không thể tạo liên kết thanh toán");
      }
    } catch (error) {
      console.error("Payment error:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsLoading(false); // Stop the loading spinner
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
                3
              )}đ đã được đặt thành công!`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    removeFromCart();
                    navigation.navigate("orderScreen");
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
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View className="items-center">
        <Image
          style={{ height: hp(40), margin: "auto" }}
          resizeMode="contain"
          source={require("../assets/images/login.png")}
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
    backgroundColor: "#3F51B5", // Màu nền
    padding: 15, // Padding bên trong
    borderRadius: 8, // Bo góc
    alignItems: "center", // Căn giữa nội dung
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
