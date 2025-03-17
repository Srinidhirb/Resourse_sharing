import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item._id === product._id);
        if (existingProduct) {
            if (existingProduct.quantity < product.quantity) {
                const updatedCart = cart.map(item =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setCart(updatedCart);
            } else {
                console.log("Cannot add more than available quantity");
            }
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1, quantity: product.quantity }];
            setCart(updatedCart);
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
    };

    const increaseQuantity = (productId) => {
        const product = cart.find(item => item._id === productId);
        if (product) {
            if (product.quantity < product.quantity) {
                const updatedCart = cart.map(item =>
                    item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
                setCart(updatedCart);
                console.log(`Product ID: ${productId}, Total Quantity: ${product.quantity}, Added Quantity: ${product.quantity + 1}`);
            } else {
                console.log(`Cannot add more than available quantity. Product ID: ${productId}, Available Quantity: ${product.quantity}, Current Quantity: ${product.quantity}`);
            }
        } else {
            console.log(`Product not found in cart. Product ID: ${productId}`);
        }
    };

    const decreaseQuantity = (productId) => {
        const product = cart.find(item => item._id === productId);
        if (product && product.quantity > 1) {
            const updatedCart = cart.map(item =>
                item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
            setCart(updatedCart);
        } else {
            console.log("Cannot reduce quantity below 1");
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};