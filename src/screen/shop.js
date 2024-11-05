import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const Header = () => {
  const navigation = useNavigation();
  const { cart } = useContext(CartContext);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Thực phẩm bổ sung</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <View style={styles.cartIconContainer}>
            <Text style={styles.cartIcon}>🛒</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
    Alert.alert(
      "Thêm vào giỏ hàng",
      `Đã thêm ${item.name} vào giỏ hàng của bạn.`
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productPrice}>
            {item.price.toLocaleString("vi-VN")} ₫
          </Text>
          <Text
            style={[
              styles.stockStatus,
              { color: item.quantity > 0 ? "#4CAF50" : "#FF5252" },
            ]}
          >
            {item.quantity > 0 ? `Còn ${item.quantity} sản phẩm` : "Hết hàng"}
          </Text>
          <TouchableOpacity
            style={[
              styles.addToCartButton,
              item.quantity <= 0 && styles.disabledButton,
            ]}
            onPress={handleAddToCart}
            disabled={item.quantity <= 0}
          >
            <Text style={styles.addToCartText}>
              {item.quantity <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://mma-be-0n61.onrender.com/api/product"
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        Alert.alert("Error", "There was an error");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(products) => products.id.toString()}
      renderItem={({ item }) => <ProductCard item={item} />}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const Shop = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#3F51B5" barStyle="light-content" />
      <Header />
      <View style={styles.content}>
        <ProductList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  // Header Styles
  headerContainer: {
    backgroundColor: "#3F51B5",
    paddingTop: 8,
    paddingBottom: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  cartButton: {
    padding: 8,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartIcon: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF5252",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  // Product List Styles
  listContainer: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    width: cardWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 12,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#F8F9FA",
  },
  productInfo: {
    gap: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A237E",
    lineHeight: 20,
    marginBottom: 4,
  },
  cartIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },

  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3F51B5",
    marginBottom: 4,
  },
  stockStatus: {
    fontSize: 12,
    marginBottom: 8,
  },
  addToCartButton: {
    backgroundColor: "#3F51B5",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  disabledButton: {
    backgroundColor: "#E0E0E0",
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Shop;
