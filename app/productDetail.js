import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";
import { TouchableOpacity } from "react-native";

const ProductDetail = () => {
  const route = useRoute();
  const { product } = route.params;
  const { addToCart } = useContext(CartContext); // Use CartContext

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart through CartContext
    Alert.alert(
      "Added to Cart",
      `${product.name} has been added to your cart.`
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.productName}>{product.name}</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "60%",
          justifyContent: "flex-end",
        }}
      >
        <Text style={styles.productPrice}>Còn {product.quality}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>

      <ScrollView>
        <Text style={styles.productDescription}>{product.description}</Text>
      </ScrollView>

      <TouchableOpacity
        style={
          product.quantity <= 0
            ? [styles.button, { backgroundColor: "gray" }]
            : styles.button
        }
        onPress={handleAddToCart}
        disabled={product.quantity <= 0} // Disable the button if quantity <= 0
      >
        <Text style={styles.text}>Thêm vào giỏ hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
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
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 7,
  },
  productDescription: {
    margin: "auto",
    fontSize: 15,
    alignItems: "center",
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    color: "red",
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 10,
    alignItems: "flex-end",
    textAlign: "center",
    justifyContent: "flex-end",
    padding: "auto",
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    pointerEvents: "box-only",
    backgroundColor: "#E5E7EB", // Fixed background color value
  },
  productQuantity: {
    fontSize: 16,
    color: "gray",
    marginBottom: 6,
    flex: 1,
  },
});

export default ProductDetail;
