// src/navigation/navigation.js
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
import Exercise from "../screen/exercise";
import timerOTD from "../screen/timerOTD";
import calculatationOTD from "../screen/calculatationOTD";
import MapPage from "../screen/map";
import Chat from "../screen/chat";
import Settings from "../screen/settings";
const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="startPage" component={StartPage} />
    <Stack.Screen name="signIn" component={SignIn} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
    <Stack.Screen name="Shop" component={Shop} options={{ title: "Shop" }} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={{ title: "ProductDetail" }}
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
      options={{ title: "orderScreen" }}
    />
    <Stack.Screen name="Chat" component={Chat} options={{ title: "chat" }} />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{ title: "Profile" }}
    />

    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{ title: "settings" }}
    />

    <Stack.Screen
      name="Exercise"
      component={Exercise}
      options={{ title: "Exercise" }}
    />
    <Stack.Screen
      name="TimerOTD"
      component={timerOTD}
      options={{ title: "Timer of the Day" }}
    />
    <Stack.Screen
      name="calculatationOTD"
      component={calculatationOTD}
      options={{ title: "Calculatation of the Day" }}
    />
    <Stack.Screen
      name="WorkoutOTD"
      component={WorkoutOTD}
      options={{ title: "Workout of the Day" }}
    />
    <Stack.Screen name="Map" component={MapPage} options={{ title: "Map" }} />
    <Stack.Screen
      name="WorkoutDetail"
      component={WorkoutDetail}
      options={{ title: "Workout Details" }}
    />
  </Stack.Navigator>
);

const RootNavigation = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigation;
