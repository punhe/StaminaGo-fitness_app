import React, { createContext, useState } from "react";

export const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (product) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = async (product, quantity) => {
    try {
      const response = await axios.post(
        "https://mma-be-0n61.onrender.com/api/reduceProduct",
        {
          id: product.id,
          quantity: quantity,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  };

  const removeFromCartt = async (product) => {
    try {
      // Gọi API để đặt hàng
      const result = await placeOrder(product, product.quantity);

      // Nếu đặt hàng thành công, xóa sản phẩm khỏi giỏ hàng
      if (result.message === "Đặt hàng thành công") {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== product.id)
        );

        // Cập nhật số lượng sản phẩm trong danh sách sản phẩm (nếu có)
        setProducts((prevProducts) =>
          prevProducts.map((item) =>
            item.id === product.id
              ? { ...item, quality: result.product.quality }
              : item
          )
        );
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
      }
    }
  };
  return (
    <CartContext.Provider
      value={{
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
