import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const products = [
  {
    id: "1",
    name: "Sữa tăng cơ ON Whey Gold Standard (2Lbs, 5Lbs)",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/736x/16/e2/cc/16e2ccfb32b560dd34d6589b38144e07.jpg",
  },
  {
    id: "2",
    name: "Rule 1 Protein | R1 Protein 5lbs Sữa Whey Tăng Cơ Giảm Mỡ",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/5f/f1/82/5ff182aeab48acfc961324b2f58819ad.jpg",
  },
  {
    id: "3",
    name: "Whey protein tốt nhất 2024 Ascent Native Whey 'Informed-Choice'",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/736x/1f/6e/bb/1f6ebbe78a8d3f5b8fd78fe0fa8976c6.jpg",
  },
  {
    id: "4",
    name: "Whey Protein có hương vị ngon nhất 100% Grass-Fed Isolate",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/ae/a9/70/aea97094a2d8c8d5c4481cdc0e5ef378.jpg",
  },
  {
    id: "5",
    name: "On Whey Gold 2lbs - Thực phẩm bổ sung hỗ trợ tăng cơ Whey",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/96/e3/f0/96e3f00385d73aa3d83b993e0dc2b790.jpg",
  },
  {
    id: "6",
    name: "Hydrolyzed Whey Protein EHPlabs ISOPEPT : Thuỷ phân",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/42/52/da/4252dad5dc8fccae80de23b92521e84c.jpg",
  },
  {
    id: "7",
    name: "Prohydrolase Whey Protein Isolate bổ sung đạm KAGED 3lbs",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/5b/ba/74/5bba74d7469911a4f702ffd41a7e7113.jpg",
  },
  {
    id: "8",
    name: "Whey Protein 'Body Fortress' số 1 USA 810g : chứa Vitamin",
    price: "100.000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://i.pinimg.com/564x/22/af/8d/22af8de94234518f2b2c31adcfeda183.jpg",
  },
];

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(item); // Add product to cart through CartContext
    Alert.alert(
      "Added to Cart",
      `${item.name} has been added to your cart.`
    );
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
          <Text style={styles.productPrice}>
            {item.price.toLocaleString("vi-VN")}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress= {handleAddToCart}
            
          >
            <Text style={{ color: "white", fontSize:12 }}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableOpacity>
  );
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
