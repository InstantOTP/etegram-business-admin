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
        <div className='relative w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] flex-shrink-0'>
          <Image
            src={'/logo.svg'}
            alt='logo'
            fill
          />
        </div>

        <p
          className={cn(
            'font-plus-jakarta-sans font-bold text-gradient text-sm lg:text-[30px] pt-[3px] lg:pt-2',
            {
              'text-white': white,
              '!text-lg !pt-1': small,
            }
          )}
        >
          instantotp
        </p>
      </div>
    </div>
  );
}
