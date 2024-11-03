import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import home from "./src/screen/home";
import { AuthContextProvider } from "./src/context/authContext";
import { MenuProvider } from "react-native-popup-menu";
import { CartProvider } from "./src/context/cartContext";
import { OrderProvider } from "./src/context/orderContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <CartProvider>
          <OrderProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="home" component={home} />
              </Stack.Navigator>
            </NavigationContainer>
          </OrderProvider>
        </CartProvider>
      </AuthContextProvider>
    </MenuProvider>
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
