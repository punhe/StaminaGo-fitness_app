import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import image1 from "../assets/img1.jpeg";

// Sample data with product image, name, price, and quantity
const products = [
  {
    id: "1",
    name: "Product 1",
    price: "$10",
    quantity: "5 left",
    image: image1,
  },
  {
    id: "2",
    name: "Product 2",
    price: "$20",
    quantity: "2 left",
    image: image1,
  },
  {
    id: "3",
    name: "Product 3",
    price: "$15",
    quantity: "7 left",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    name: "Product 4",
    price: "$25",
    quantity: "3 left",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "5",
    name: "Product 5",
    price: "$30",
    quantity: "1 left",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "6",
    name: "Product 6",
    price: "$12",
    quantity: "4 left",
    image: "https://via.placeholder.com/100",
  },
];

const ProductCard = ({ item }) => (
  <TouchableOpacity style={styles.card}>
    <View style={{ flex: 1 }}>
      <Image source={item.image} style={styles.image} />
    </View>
    <View style={{ flex: 2 }}>
      <Text style={styles.productName}>{item.name}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginRight: 20,
          paddingTop: 10,
        }}
      >
        <Text style={styles.productPrice}>{item.price}</Text>
        {/* <Text style={styles.productQuantity}>{item.quantity}</Text> */}
      </View>
    </View>
  </TouchableOpacity>
);

const Shop = () => {
  const renderProduct = ({ item }) => (
    <View style={styles.productRow}>
      <ProductCard item={item} />
    </View>
  );

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
    flexWrap: "wrap",
  },
  card: {
    flex: 1,
    height: 100,
    borderRadius: 12,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 80,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "green",
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 13,
    color: "gray",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default Shop;
