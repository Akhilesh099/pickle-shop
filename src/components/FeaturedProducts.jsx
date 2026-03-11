'use client';
import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/lib/supabaseClient';

export default function FeaturedProducts() {
    const { addToCart } = useCart();
    const [featured, setFeatured] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                if (!supabase) {
                    setFeatured([]);
                    return;
                }
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('category', { ascending: true });
                
                if (error) throw error;
                setFeatured(data || []);
            } catch (error) {
                console.error("Failed to fetch featured products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    if (loading) {
       return (
           <div className="flex justify-center py-10">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
           </div>
       );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map(product => (
                <div key={product.id} className="h-full">
                    <Card
                        title={product.name}
                        description={`${product.category} - Authentic homemade recipe`}
                        price={product.price}
                        imageSrc={product.image}
                        onAdd={() => addToCart(product)}
                    />
                </div>
            ))}
        </div>
    );
}
