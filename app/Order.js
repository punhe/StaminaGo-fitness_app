import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./CartContext";

const SHIPPING_FEE = 1;

const Order = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0);
  }, [cartItems]);

  const total = subtotal + SHIPPING_FEE;

  const handlePlaceOrder = () => {
    // Here you can add logic to send the order to the server
    Alert.alert(
      "Order Placed",
      `Your order of $${total.toFixed(2)} has been placed successfully!`,
      [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            navigation.navigate("Shop");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Subtotal: ${subtotal.toFixed(2)}</Text>
        <Text style={styles.summaryText}>
          Shipping: ${SHIPPING_FEE.toFixed(2)}
        </Text>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
      <Button title="Place Order" onPress={handlePlaceOrder} />
      <Button title="Back to Cart" onPress={() => navigation.goBack()} />
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
