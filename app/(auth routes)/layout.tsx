// app/(auth routes)/layout.tsx

'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import AuthProvider from '@/components/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import '@/app/globals.css';

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  const router = useRouter();
  useEffect(() => {
    router.refresh(); // ⬅️ ОБОВʼЯЗКОВИЙ refresh при монтуванні
  }, [router]);

  return (
    <AuthProvider>
      <TanStackProvider>
        <main>{children}</main>
      </TanStackProvider>
    </AuthProvider>
  );
}
