import LoginForm from '@/components/forms/sign-in';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <main className='min-h-svh bg-accent py-10'>
      <section className='flex justify-center items-center container'>
        <LoginForm />
      </section>
    </main>
  );
}
