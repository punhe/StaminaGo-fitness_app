import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OrderContext = createContext();

export const OrderProvider = function ({ children }) {
  const [orders, setOrders] = useState([]);

  useEffect(function () {
    loadOrders();
  }, []);

  const loadOrders = async function () {
    try {
      const savedOrders = await AsyncStorage.getItem("orders");
      if (savedOrders !== null) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const saveOrders = async function (newOrders) {
    try {
      await AsyncStorage.setItem("orders", JSON.stringify(newOrders));
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  };

  const addOrder = function (newOrder) {
    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  const updateOrderStatus = function (orderId, isPaid) {
    const updatedOrders = orders.map(function (order) {
      return order.id === orderId ? { ...order, isPaid } : order;
    });
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  return React.createElement(
    OrderContext.Provider,
    { value: { orders, addOrder, updateOrderStatus } },
    children
  );
};
