import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "./cartContext";

const products = [
  {
    id: "1",
    name: "Product 1",
    price: "$10",
    quantity: 5,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Product 2",
    price: "$15",
    quantity: 3,
    image: "https://via.placeholder.com/100",
  },
  // Add more products here
];

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 2 }}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productQuantity}>{item.quantity} left</Text>

        <Button title="Add to Cart" onPress={() => addToCart(item)} />
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            navigation.navigate("ProductDetail", { product: item })
          }
        >
          <Text style={styles.viewButtonText}>View Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Shop = () => {
  const navigation = useNavigation();

  const renderProduct = ({ item }) => <ProductCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  productQuantity: {
    fontSize: 12,
    color: "red",
  },
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "green",
    marginBottom: 10,
  },
  viewButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonText: {
    color: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cartButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Shop;
