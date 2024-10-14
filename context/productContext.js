import React, { createContext, useState } from "react";

export const ProductContext = createContext(undefined);

export const ProductProvider = function ({ children }) {
  const [products, setProducts] = useState([]);

  // const updateProductQuantity = function (productId, quantity) {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === productId
  //         ? { ...product, quantity: Math.max(0, product.quantity + quantity) } // Ensure we don't set negative quantity
  //         : product
  //     )
  //   );
  // };

  return React.createElement(
    ProductContext.Provider,
    { value: { products } },
    children
  );
};
