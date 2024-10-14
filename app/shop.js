import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CartContext } from "../context/cartContext";

const products = [
  {
    id: "1",
    name: "Product 1",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    image: "https://via.placeholder.com/100",
  },
  {
    id: "2",
    name: "Product 2",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
   
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Product 3",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    name: "Product 4",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
  {
    id: "5",
    name: "Product 5",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
  {
    id: "6",
    name: "Product 6",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
  {
    id: "7",
    name: "Product 7",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
  {
    id: "8",
    name: "Product 8",
    price: "100000 đ",
    description:
      "Loại dinh dưỡng: amino axit, BCAA, Chất đạm\nHạn sử dụng: 24 tháng\nXuất xứ: Mỹ\nKiểu đóng gói: Hộp\nGiới tính: Unisex\nMẫu sản phẩm: bột\nChức năng hỗ trợ thể hình: Tăng cơ, Sau tập luyện và phục hồi, Chất đạm\nNgày hết hạn: 01-09-2026\nTên tổ chức chịu trách nhiệm sản xuất: Gymstore\nGửi từ: TP. Hồ Chí Minh",
    
    image: "https://via.placeholder.com/100",
  },
];

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("productDetail", { product: item })}
    >
      <ScrollView>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={{ flex: 2, alignItems: "flex-end" }}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>

          <Button title="Add to Cart" onPress={() => addToCart(item)} />
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
    margin: "auto",
    color: "black",
    fontWeight: "500",
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
    width: 100,
    height: 90,
    marginBottom: 10,
    borderRadius: 5,
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
