// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { AuthContextProvider } from "./src/context/authContext";
import { MenuProvider } from "react-native-popup-menu";
import { CartProvider } from "./src/context/cartContext";
import { OrderProvider } from "./src/context/orderContext";
import RootNavigation from "./src/navigation/navigation"; // Ensure this path is correct
import { ProductProvider } from "./src/context/productContext";

export default function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <MenuProvider>
              <View style={{ flex: 1 }}>
                <RootNavigation />
              </View>
            </MenuProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
