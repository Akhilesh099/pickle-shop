import { CartProvider } from '@/context/CartContext';
import Footer from '@/components/Footer';
import CartActionWrapper from '@/components/CartActionWrapper';
import NextAuthProvider from '@/components/NextAuthProvider';
import './globals.css';

export const metadata = {
  title: 'Pickle Shop - Premium Homemade Pickles',
  description: 'Authentic, 100% hygienic, and premium quality homemade pickles delivered to your door.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <NextAuthProvider>
          <CartProvider>
            {/* We use a client component wrapper for Navbar and Cart Drawer state */}
            <CartActionWrapper>
              <main className="flex-grow">
                {children}
              </main>
            </CartActionWrapper>
            <Footer />
          </CartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
