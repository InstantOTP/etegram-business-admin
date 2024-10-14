'use client';

// import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/lib/utils';

import { useSearchParams, usePathname } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  // NOTE: comment in this code when you get to this point in the course

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
      <div className='flex justify-between w-full p-4 bg-background border-t rounded-b-md'>
        <PaginationArrow
          direction='left'
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className='hidden sm:flex -space-x-px'>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction='right'
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center text-sm font-inter rounded-md',
    {
      'rounded-l-md': position === 'first' || position === 'single',
      'rounded-r-md': position === 'last' || position === 'single',
      'z-10 bg-accent border-blue-600 text-primary rounded-md': isActive,
      'hover:bg-accent': !isActive && position !== 'middle',
      'text-gray-300': position === 'middle',
    }
  );

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link
      href={href}
      className={className}
    >
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = clsx(
    'flex h-10 items-center justify-center rounded-md border font-inter',
    {
      'pointer-events-none text-gray-300': isDisabled,
      'hover:bg-gray-100': !isDisabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    }
  );

  const icon =
    direction === 'left' ? (
      <div className='text-sm font-medium flex space-x-2 items-center py-1 px-2'>
        <ArrowLeft className='w-4 h-4' />
        <span className='group-hover:text-primary'>Previous</span>
      </div>
    ) : (
      <div className='group text-sm font-medium flex space-x-2 items-center py-1 px-2'>
        <span className='group-hover:text-primary'>Next</span>
        <ArrowRight className='w-4 h-4 group-hover:text-primary' />
      </div>
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
    >
      {icon}
    </Link>
  );
}
