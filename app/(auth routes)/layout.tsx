// app/(auth routes)/layout.tsx

'use client';

import { ReactNode, useEffect } from 'react'; // ⬅️ додано useEffect
import { useRouter } from 'next/navigation'; // ⬅️ додано useRouter

import AuthProvider from '@/components/AuthProvider/AuthProvider';
// import Header from '@/components/Header/Header';
// import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import '@/app/globals.css';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const router = useRouter(); // ⬅️ ініціалізація роутера

  useEffect(() => {
    router.refresh(); // ⬅️ ОБОВʼЯЗКОВИЙ refresh при монтуванні
  }, [router]);

  return (
    <AuthProvider>
      <TanStackProvider>
        {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </TanStackProvider>
    </AuthProvider>
  );
}
