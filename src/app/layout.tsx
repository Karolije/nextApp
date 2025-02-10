import localFont from 'next/font/local';
import './globals.css';
import { ReactQueryProvider } from './providers/ReactQueryProvider/ReactQueryProvider';
import { ShoppingCartProvider } from './providers/ShoppingCartProvider';
import { Navbar } from '@/app/components/Navbar'; // Import Navbar

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="pl">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ReactQueryProvider>
        <ShoppingCartProvider> 
          <Navbar /> 
          <main className="p-6">{children}</main>
        </ShoppingCartProvider>
      </ReactQueryProvider>
    </body>
  </html>
);

export default RootLayout;
