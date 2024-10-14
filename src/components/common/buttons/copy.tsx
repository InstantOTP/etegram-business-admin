'use client';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Copy } from 'iconsax-react';
import { Button } from '@/components/ui/button';

export default function CopyToClipBoard({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  const { toast } = useToast();
  function copyText() {
    navigator.clipboard.writeText(text);
    toast({ description: 'Copied to clipboard', variant: 'default' });
  }
  return (
    <Copy
      className={cn(
        'bg-accent text-primary p-[2px] rounded-md inline-block cursor-pointer',
        className
      )}
      onClick={copyText}
    />
  );
}

export function CopyToClipBoardDropdown({
  text,
  className,
  title,
}: {
  text: string;
  className?: string;
  title: string;
}) {
  const { toast } = useToast();
  function copyText() {
    navigator.clipboard.writeText(text);
    toast({ description: 'Copied to clipboard', variant: 'default' });
  }
  return (
    <Button
      variant={'ghost'}
      onClick={copyText}
      className='rounded-sm px-2 py-1.5 hover:bg-accent hover:text-accent-foreground w-full'
    >
      <div className='flex space-x-3 py-2.5 px-3.5 font-inter !text-xs w-full'>
        <Copy className='w-4 h-4' />
        <span>{title}</span>
      </div>
    </Button>
  );
}
