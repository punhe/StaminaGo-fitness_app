import React, { useContext } from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CartContext } from "./cartContext";

const ProductDetail = () => {
  const route = useRoute();
  const { product } = route.params;
  const { addToCart } = useContext(CartContext); // Use CartContext

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productQuantity}>Available: {product.quantity}</Text>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: "green",
    marginBottom: 10,
  },
  productQuantity: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});

export default ProductDetail;
