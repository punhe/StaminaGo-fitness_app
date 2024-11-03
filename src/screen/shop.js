import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item); // Add product to cart through CartContext
    Alert.alert("Added to Cart", `${item.name} has been added to your cart.`);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("productDetail", { product: item })}
    >
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <Text style={styles.productName}>{item.name}</Text>
          <view>
            <Text style={styles.productPrice}>
              {item.price.toLocaleString("vi-VN")}
            </Text>
            <Text style={styles.productPrice}>
              {item.quality > 0 ? `còn ${item.quality}` : "hết hàng"}
            </Text>
          </view>
          <TouchableOpacity
            style={
              product.quantity <= 0
                ? [styles.button, { backgroundColor: "gray" }]
                : styles.button
            }
            onPress={handleAddToCart}
            disabled={product.quantity <= 0}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
              Thêm vào giỏ hàng
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
        ); // Fetch from your backend API
        const data = await response.json();
        setProducts(data); // Set the fetched data to the state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts(); // Fetch products when the component mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
};
const Shop = () => {
  const navigation = useNavigation();

  const renderProduct = ({ item }) => <ProductCard item={item} />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thực phẩm bổ sung</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate("cart")}
      >
        <Text style={styles.cartButtonText}>Đến giỏ hàng</Text>
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
  button: {
    backgroundColor: "#3F51B5", // Màu nền
    padding: 11, // Padding bên trong
    borderRadius: 8, // Bo góc
    alignItems: "center", // Căn giữa nội dung
    marginTop: 10, // Khoảng cách phía trên
  },
  header: {
    fontSize: 22,
    margin: "auto",
    color: "#FF6347",
    fontWeight: "500",
  },
  productQuantity: {
    fontSize: 12,
    color: "red",
  },
  card: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    maxWidth: 160,
    maxHeight: 300,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: 120,
    height: 90,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
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
    borderRadius: 10,
    marginTop: 10,
  },
  viewButtonText: {
    color: "#fff",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cartButton: {
    backgroundColor: "#3F51B5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Shop;
