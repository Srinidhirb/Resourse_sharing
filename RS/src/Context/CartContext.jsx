import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, startDate, endDate) => {
    const existingProduct = cart.find((item) => item._id === product._id);
  
    if (existingProduct) {
      if (existingProduct.quantity < product.availableQuantity) {
        const updatedCart = cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1, startDate, endDate }
            : item
        );
        setCart(updatedCart);
      } else {
        console.log("Cannot add more than available quantity");
      }
    } else {
      const updatedCart = [
        ...cart,
        { ...product, quantity: 1, startDate, endDate },
      ];
      setCart(updatedCart);
    }
  };
  

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item._id === id) {
          if (item.quantity < item.totalAvailableDays) {
            console.log(
              "Increasing Quantity:",
              item.quantity + 1,
              "Available:",
              item.quantity + 1 <= item.totalAvailableDays
            );
            return { ...item, quantity: item.quantity + 1 };
          } else {
            console.warn("Maximum quantity reached for this item!");
          }
        }
        return item;
      });
    });
  };
  

  const decreaseQuantity = (productId) => {
    const product = cart.find((item) => item._id === productId);

    if (product) {
      if (product.quantity > 1) {
        const updatedCart = cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        // If quantity reaches 1 and decrement is clicked, remove from cart
        removeFromCart(productId);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
