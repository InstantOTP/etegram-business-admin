'use client';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function GoBackButton({ className }: { className?: string }) {
  const { back } = useRouter();
  return (
    <div className='ml-auto w-fit'>
      <button
        onClick={back}
        className={buttonVariants({ size: 'lg', className })}
      >
        <ArrowLeft className='mr-2' />
        Back
      </button>
    </div>
  );
}
