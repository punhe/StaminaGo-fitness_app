import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MenuProvider } from "react-native-popup-menu";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "../context/cartContext";
import StartPage from "./index";
import Home from "../app/(app)/home";
import Shop from "./shop";
import ProductDetail from "./productDetail";
import Cart from "./cart";
import Order from "./order";
import { OrderProvider } from "../context/orderContext";
import OrdersScreen from "./orderScreen";
import Profile from "./profile";
import WorkoutOTD from "./workoutOTD";
import WorkoutDetail from "./workoutOTDDetails";

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
    <MenuProvider>
      <AuthContextProvider>
        <CartProvider>
          <OrderProvider>
            <MainLayout />
          </OrderProvider>
        </CartProvider>
      </AuthContextProvider>
    </MenuProvider>
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
      <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="WorkoutOTD" component={WorkoutOTD} />
      <Stack.Screen name="WorkoutOTDDetails" component={WorkoutDetail} />
    </Stack.Navigator>
  </CartProvider>
);

export { Layout };
