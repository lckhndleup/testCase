'use client';

import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { QueryProvider } from './QueryProvider';

import '../styles/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.variable} antialiased`}>
        <QueryProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#ED8936',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
