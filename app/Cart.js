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
  const { cartItems, removeFromCart } = useContext(CartContext);

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
        <Text style={styles.emptyMessage}>
          Giỏ hàng của bạn không có gì hết mua!
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text
                  style={styles.itemName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => removeFromCart(item)}
                >
                  <Text style={styles.text}>Xóa</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
              Subtotal: {subtotal.toFixed(3)}đ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Order")}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.text}>Tiến hành thanh toán</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>Tiếp tục mua</Text>
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
