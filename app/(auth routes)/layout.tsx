// app/(auth routes)/layout.tsx

'use client';

import { ReactNode } from 'react';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import './globals.css';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <AuthProvider>
      <TanStackProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </TanStackProvider>
    </AuthProvider>
  );
}
