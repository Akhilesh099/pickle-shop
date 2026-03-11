'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/constants/products';
import { useCart } from '@/context/CartContext';
import Button from '@/components/Button';
import StarRating from '@/components/StarRating';

export default function ProductDetail({ params }) {
    // Unwrap the params promise for Next 15 compatibility
    const unwrappedParams = use(params);
    const productId = parseInt(unwrappedParams.id, 10);
    const product = products.find(p => p.id === productId);

    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        notFound();
    }

    const handleAddToCart = () => {
        // Add multiple quantities by calling addToCart multiple times or adjusting Context.
        // For simplicity, we can loop, or ideally update the context method to accept quantity.
        // Assuming context addToCart only adds 1, we map it. 
        // Best practice is updating Context API to accept a quantity parameter, but for this demo:
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="bg-background min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link href="/products" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2">
                        <span>&larr;</span> Back to Products
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative h-96 md:h-full min-h-[400px]">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-2">
                                <span className="inline-block px-3 py-1 bg-green-50 text-primary text-sm font-semibold rounded-full">
                                    {product.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>

                            <div className="text-3xl font-bold text-primary mb-6">
                                ₹{product.price} <span className="text-lg text-gray-500 font-normal">/{product.unit}</span>
                            </div>

                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Experience the authentic taste of homemade <strong>{product.name}</strong>.
                                Prepared with 100% hygiene and premium quality ingredients, following traditional recipes
                                to ensure the perfect balance of spices and flavor in every bite.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >-</button>
                                    <span className="px-4 py-3 font-semibold min-w-[3rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >+</button>
                                </div>

                                <Button
                                    variant="primary"
                                    className="flex-1 py-3 text-lg"
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm font-medium">100% Hygienic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm font-medium">Premium Quality</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm font-medium">Home Made</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm font-medium">No Preservatives</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="mt-12 max-w-3xl">
                    <StarRating />
                </div>
            </div>
        </div>
    );
}
