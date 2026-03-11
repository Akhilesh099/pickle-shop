'use client';

import { useCart } from '@/context/CartContext';

export default function Toast() {
    const { showToast, toastMessage } = useCart();

    if (!showToast) return null;

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
            <div className="bg-red-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-semibold text-sm">
                <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {toastMessage}
            </div>
        </div>
    );
}
