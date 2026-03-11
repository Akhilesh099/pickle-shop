'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import Toast from './Toast';
import { useCart } from '@/context/CartContext';

export default function CartActionWrapper({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, cartItemCount } = useCart();

  return (
    <>
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartItemCount={cartItemCount}
      />
      
      {children}
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      <Toast />
    </>
  );
}
