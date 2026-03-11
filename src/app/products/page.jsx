'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function ProductsPage() {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (!supabase) {
                    setProducts([]);
                    return;
                }
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('category', { ascending: true });
                
                if (error) throw error;
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Derive categories automatically from product data
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-background min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-green-50 text-primary font-semibold text-sm mb-6 border border-green-100 uppercase tracking-widest shadow-sm">
                        Our Collection
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Artisanal Pickles</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        100% Hygiene | 100% Quality. Browse our selection of authentic, homemade non-veg and veg pickles crafted with love.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-14">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${activeCategory === category
                                    ? 'bg-primary text-white shadow-md transform scale-105'
                                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200 hover:border-green-200 shadow-sm'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading ? (
                   <div className="flex justify-center py-20">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                   </div>
                ) : (
                    <>
                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="h-full">
                                    <Card
                                        title={product.name}
                                        description={`${product.category} - Traditional Recipe`}
                                        price={product.price}
                                        imageSrc={product.image}
                                        onAdd={() => addToCart(product)}
                                    />
                                </div>
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 mt-8 shadow-sm">
                                <div className="text-4xl mb-4">🥒</div>
                                <h3 className="text-xl font-semibold text-foreground mb-2">No pickles found</h3>
                                <p className="text-gray-500">We couldn't find any products in this category.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
