import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Logo({
  white,
  small,
}: {
  white?: boolean;
  small?: boolean;
}) {
  return (
    <div>
      <div className='flex gap-x-2 lg:gap-x-3'>
        <div className='relative w-[128px] h-[56px] flex-shrink-0'>
          <Image
            src={'/logo.svg'}
            alt='logo'
            fill
          />
        </div>
      </div>
    </div>
  );
}
