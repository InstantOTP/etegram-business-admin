import { Suspense } from 'react';
import ResetPasswordForm from '@/components/forms/reset-password';

export default function ResetPassword({
  searchParams,
}: {
  searchParams: {
    email?: string;
    token?: string;
  };
}) {
  const email = searchParams.email ?? '';
  const token = searchParams.token ?? '';
  return (
    <main className='min-h-svh bg-accent py-10'>
      <section className='flex justify-center items-center container'>
        <Suspense>
          <ResetPasswordForm
            email={email}
            token={token}
          />
        </Suspense>
      </section>
    </main>
  );
}
