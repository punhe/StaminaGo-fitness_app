// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/authContext";

import StartPage from "../screen/startPage";
import SignIn from "../screen/signIn";
import Home from "../screen/home";
import Shop from "../screen/shop";
import ProductDetail from "../screen/productDetail";
import Cart from "../screen/Cart";
import Order from "../screen/Order";
import OrdersScreen from "../screen/orderScreen";
import Profile from "../screen/profile";
import WorkoutOTD from "../screen/workoutOTD";
import WorkoutDetail from "../screen/workoutOTDDetails";

const Stack = createStackNavigator();

// Navigation cho người dùng chưa đăng nhập
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StartPage" component={StartPage} />
    <Stack.Screen name="SignIn" component={SignIn} />
  </Stack.Navigator>
);

// Navigation cho người dùng đã đăng nhập
const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    <Stack.Screen name="Shop" component={Shop} options={{ title: "Shop" }} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={{ title: "Product Details" }}
    />
    <Stack.Screen
      name="Cart"
      component={Cart}
      options={{ title: "Shopping Cart" }}
    />
    <Stack.Screen name="Order" component={Order} options={{ title: "Order" }} />
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ title: "Order History" }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />
    <Stack.Screen
      name="WorkoutOTD"
      component={WorkoutOTD}
      options={{ title: "Workout of the Day" }}
    />
    <Stack.Screen
      name="WorkoutDetail"
      component={WorkoutDetail}
      options={{ title: "Workout Details" }}
    />
  </Stack.Navigator>
);

// Navigation Wrapper để kiểm tra authentication
const RootNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

// App Component chính
