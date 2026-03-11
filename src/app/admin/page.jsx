'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: '', image: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, router]);

  const fetchProducts = async () => {
    try {
      if (!supabase) {
          console.warn('Supabase not configured yet. Fallback empty.');
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
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditForm({ price: product.price, image: product.image });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ price: '', image: '' });
  };

  const uploadImage = async (event) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      
      setEditForm({ ...editForm, image: data.publicUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const saveProduct = async (id) => {
    try {
      if (!supabase) return alert('Supabase not configured!');

      const { error } = await supabase
        .from('products')
        .update({
          price: parseFloat(editForm.price),
          image: editForm.image,
        })
        .eq('id', id);

      if (!error) {
        setEditingId(null);
        fetchProducts(); // Refresh list
      } else {
        alert('Failed to update product: ' + error.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An error occurred while updating the product.');
    }
  };

  if (status === 'loading' || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">Welcome, {session.user.email}</span>
            <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                  <th className="p-4 font-medium">Image</th>
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Category</th>
                  <th className="p-4 font-medium">Price (₹/kg)</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 align-middle">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md bg-gray-100 mb-2" />
                      {editingId === product.id && (
                        <div className="flex flex-col gap-2 mt-2">
                           <input
                            type="file"
                            accept="image/*"
                            onChange={uploadImage}
                            disabled={uploading}
                            className="block w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                           />
                           {uploading && <span className="text-xs text-blue-500">Uploading...</span>}
                          <input
                            type="text"
                            value={editForm.image}
                            onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                            placeholder="/images/example.jpg or Supabase URL"
                            className="w-full text-xs p-1 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                          />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-foreground align-middle">
                      {product.name}
                    </td>
                    <td className="p-4 text-gray-600 align-middle">
                      {product.category}
                    </td>
                    <td className="p-4 align-middle">
                      {editingId === product.id ? (
                        <input
                          type="number"
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="w-24 p-2 border border-gray-300 rounded focus:ring-primary focus:border-primary"
                        />
                      ) : (
                        `₹${product.price}`
                      )}
                    </td>
                    <td className="p-4 align-middle text-right">
                      {editingId === product.id ? (
                        <div className="flex justify-end gap-2">
                          <button onClick={() => saveProduct(product.id)} className="text-green-600 hover:text-green-800 font-medium text-sm">Save</button>
                          <button onClick={cancelEditing} className="text-gray-500 hover:text-gray-700 font-medium text-sm">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEditing(product)}
                          className="text-primary hover:text-primary-dark font-medium text-sm"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
