import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error('Error loading cart from localStorage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart to localStorage:', error);
        }
    }, [cart]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const index = prevCart.findIndex((cartItem) => cartItem.id === item.id);
            if (index !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[index].quantity += 1;
                return updatedCart;
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prevCart) =>
            prevCart.reduce((acc, item) => {
                if (item.id === itemId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        console.error('useCart must be used within a CartProvider');
        return {};
    }
    return context;
};
