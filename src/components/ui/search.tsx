'use client';

import { SearchIcon } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from './input';

export default function Search({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = useDebouncedCallback((text: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (text) {
      params.set('query', text);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label
        htmlFor='search'
        className='sr-only'
      >
        Search
      </label>
      <Input
        className='peer block w-full rounded-md border  py-[9px] pl-10 text-xs outline-2 placeholder:text-gray-500 font-inter bg-background placeholder:text-sm'
        placeholder={placeholder ? placeholder : 'Search...'}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
    </div>
  );
}
