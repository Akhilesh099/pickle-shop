'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutPage() {
    const { cartItems, cartItemCount, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = 50; // Flat shipping rate
    const total = subtotal + (subtotal > 0 ? shipping : 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!supabase) {
          alert('Supabase not configured. Cannot process checkout.');
          return;
        }

        try {
            // Validate prices against database
            const cartIds = cartItems.map(item => item.id);
            const { data: dbProducts, error } = await supabase
                .from('products')
                .select('id, name, price')
                .in('id', cartIds);

            if (error) throw error;

            let validatedSubtotal = 0;
            let message = `New Order!\n`;
            message += `\nItems:\n`;

            cartItems.forEach(cartItem => {
                const dbProduct = dbProducts.find(p => p.id === cartItem.id);
                if (dbProduct) {
                    const itemTotal = dbProduct.price * cartItem.quantity;
                    validatedSubtotal += itemTotal;
                    message += `${cartItem.quantity}${cartItem.unit} ${dbProduct.name}: ₹${itemTotal}\n`;
                }
            });

            const validatedTotal = validatedSubtotal + (validatedSubtotal > 0 ? shipping : 0);
            
            message += `\nTotal: ₹${validatedSubtotal} + ₹${shipping} Shipping = ₹${validatedTotal}\n\n`;
            message += `Customer Details:\n`;
            message += `Name: ${formData.name}\n`;
            message += `Phone: ${formData.phone}\n`;
            message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n`;

            const encodedMessage = encodeURIComponent(message);
            const whastappUrl = `https://wa.me/919059418750?text=${encodedMessage}`;

            window.open(whastappUrl, '_blank');

            setIsSubmitted(true);
            clearCart();
        } catch (error) {
            console.error("Checkout validation failed:", error);
            alert("An error occurred while verifying prices. Please try again.");
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground mb-4">Order Forwarded!</h1>
                    <p className="text-gray-600 mb-8">
                        Thank you, {formData.name}. You have been redirected to WhatsApp to confirm your order details.
                    </p>
                    <Link href="/">
                        <Button variant="outline" className="w-full">Return Home</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Form Section */}
                    <div className="flex-1">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="3"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                                        <input
                                            type="text"
                                            id="pincode"
                                            name="pincode"
                                            required
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border"
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full py-4 text-lg mt-8"
                                    disabled={cartItems.length === 0}
                                >
                                    Confirm on WhatsApp (₹{total})
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 italic">Your cart is empty.</p>
                            ) : (
                                <>
                                    <div className="max-h-64 overflow-y-auto mb-6 pr-2">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between py-3 border-b border-gray-50">
                                                <div>
                                                    <p className="font-medium text-sm">{item.name}</p>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity} {item.unit}</p>
                                                </div>
                                                <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-200">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal</span>
                                            <span className="font-medium">₹{subtotal}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Shipping</span>
                                            <span className="font-medium">₹{shipping}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200 mt-4">
                                            <span>Total</span>
                                            <span className="text-primary">₹{total}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
