import React, { createContext, useState } from "react";
import axios from "axios"; // Add this import
import { Alert } from "react-native";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]); // Add this if needed

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const deleteFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = async (product, quantity) => {
    try {
      const response = await axios.post(
        "https://mma-be-0n61.onrender.com/api/product/reduceProduct",
        {
          id: product.id,
          quantity: 1,
        }
      );
      return response.data;
    } catch (error) {
      Alert.alert("Error placing order:", error);
      throw error;
    }
  };

  const removeFromCartt = async (product) => {
    try {
      const result = await placeOrder(product, product.quantity - 1);

      if (result.message === "Đặt hàng thành công") {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== product.id)
        );

        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === product.id
              ? { ...item, quality: result.product.quality }
              : item
          )
        );
      }
    } catch (error) {}
  };

  return (
    <CartContext.Provider
      value={{
        deleteFromCart,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        removeFromCartt,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
