import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./cartContext";

const Cart = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price;
    }, 0);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item)} />
              </View>
            )}
          />
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>
              Subtotal: ${subtotal.toFixed(2)}
            </Text>
          </View>
          <Button
            title="Proceed to Checkout"
            onPress={() => navigation.navigate("Order")}
            disabled={cartItems.length === 0}
          />
        </>
      )}
      <Button title="Continue Shopping" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
  },
});

export default Cart;
