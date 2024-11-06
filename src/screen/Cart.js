import React, { useContext, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, deleteFromCart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(" đ", ""));
      return sum + price;
    }, 0);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giỏ hàng của bạn</Text>
      {cartItems.length === 0 ? (
        <View>
          <Text style={styles.emptyMessage}>
            Giỏ hàng của bạn không có gì hết mua!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Orders")}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.text}>Kiểm tra đơn hàng</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity onPress={() => deleteFromCart(item.id)}>
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
              Tổng tiền: {subtotal.toFixed(3)} đ
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Order")}
              disabled={cartItems.length === 0}
            >
              <Text style={styles.text}>Tiến hành thanh toán</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Orders")}
              disabled={cartItems.length === 0}
            >
              <Text style={styles.text}>Kiểm tra đơn hàng</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.text}>Tiếp tục mua</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  subtotalContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "flex-end",
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonn: {
    backgroundColor: "#3F51B5",
    width: "17%",
    padding: 9,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Bo góc // Căn giữa nội dung // Khoả
    marginTop: -10,
  },
  button: {
    backgroundColor: "#3F51B5", // Màu nền
    padding: 15, // Padding bên trong
    borderRadius: 8, // Bo góc
    alignItems: "center", // Căn giữa nội dung
    marginTop: 10, // Khoảng cách phía trên
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "gray",
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 18,
    width: "40%",
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
  },
});

export default Cart;
