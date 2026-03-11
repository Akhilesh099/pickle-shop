import Button from './Button';
import Link from 'next/link';

export default function CartDrawer({ isOpen, onClose, cartItems = [], onRemoveItem, onUpdateQuantity }) {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-all z-40"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-bold text-foreground">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                    >
                        <span className="sr-only">Close cart</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-10 flex-grow flex flex-col justify-center">
                            <p className="text-gray-500 mb-4">Your cart is empty.</p>
                            <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 py-2 border-b">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-foreground">{item.name}</h4>
                                    <p className="text-primary text-sm font-medium">₹{item.price}/kg</p>

                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                                        >-</button>
                                        <span className="text-sm">{item.quantity} kg</span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                                        >+</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <p className="font-bold">₹{item.price * item.quantity}</p>
                                    <button
                                        onClick={() => onRemoveItem(item.id)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                        <div className="flex justify-between mb-4">
                            <span className="font-bold text-foreground">Subtotal</span>
                            <span className="font-bold text-primary">₹{subtotal}</span>
                        </div>
                        <Link href="/checkout" onClick={onClose} className="block">
                            <Button variant="primary" className="w-full h-12 text-lg">
                                Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
