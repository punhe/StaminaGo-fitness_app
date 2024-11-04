import React, { createContext, useState, useEffect } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const savedOrders = await AsyncStorage.getItem("orders");
      if (savedOrders !== null) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const saveOrders = async (newOrders) => {
    try {
      await AsyncStorage.setItem("orders", JSON.stringify(newOrders));
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  const addOrder = (newOrder) => {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  const updateOrderStatus = (orderId, isPaid) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, isPaid } : order
    );
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
