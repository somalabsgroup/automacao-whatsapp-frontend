'use client';

import { Suspense } from 'react';
import LoginCard from '@/components/LoginCard';

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginCard />
    </Suspense>
  );
}

