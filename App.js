import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContextProvider } from "./src/context/authContext";
import { ProductProvider } from "./src/context/productContext";
import { CartProvider } from "./src/context/cartContext";
import { OrderProvider } from "./src/context/orderContext";
import { MenuProvider } from "react-native-popup-menu";
import RootNavigation from "./src/navigation/navigation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <MenuProvider>
              <RootNavigation />
            </MenuProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthContextProvider>
  );
}
