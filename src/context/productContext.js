import React, { createContext, useState } from "react";
import { Text } from "react-native";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const updateProductQuantity = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(0, product.quantity + quantity) }
          : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, updateProductQuantity }}
    >
      {children}
    </ProductContext.Provider>
  );
};
