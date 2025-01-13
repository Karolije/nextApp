import localFont from 'next/font/local';
import './globals.css';
import { ReactQueryProvider } from './providers/ReactQueryProvider/ReactQueryProvider';

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
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </body>
  </html>
);

export default RootLayout;
