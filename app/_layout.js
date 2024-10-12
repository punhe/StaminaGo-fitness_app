import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "../context/cartContext";
import StartPage from "./StartPage";
import Home from "./Home";
import Shop from "./Shop";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Order from "./Order";

const Stack = createStackNavigator();

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("home");
    } else if (isAuthenticated === false) {
      router.replace("signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </AuthContextProvider>
  );
}

const Layout = () => (
  <CartProvider>
    <Stack.Navigator>
      <Stack.Screen name="index" options={{ title: "Home" }} component={Home} />
      <Stack.Screen name="map" options={{ title: "Map View" }} />
      <Stack.Screen name="Shop" options={{ title: "Shop" }} component={Shop} />
      <Stack.Screen name="StartPage" component={StartPage} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  </CartProvider>
);

export { Layout };
