import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sort } from 'iconsax-react';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Button } from '../ui/button';
import { removeSpecialCharacters } from '@/lib/utils';

export type FilterOptions = {
  name: string;
  options: string[];
}[];

interface FilterProps {
  filters: FilterOptions;
}

export default function Filter({ filters }: FilterProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleChange = (name: string, text: string) => {
    const params = new URLSearchParams(searchParams);
    let existingValue = params.get(name);
    params.set('page', '1');
    if (text) {
      if (params.has(name)) {
        if (existingValue?.includes(text)) {
          let newValue = existingValue.replace(text, '');
          params.set(name, `${removeSpecialCharacters(newValue)}`);
        } else {
          params.set(name, `${existingValue},${text}`);
        }
      } else {
        params.set(name, text);
      }
    } else {
      params.delete(name);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const activeFilters = useMemo(() => {
    const old = Object.fromEntries(searchParams.entries());
    const keys = Object.keys(old);
    let filtered: any = [];

    filters.forEach((item) => {
      if (keys.includes(item.name)) {
        filtered.push(item.name);
      }
    });
    return filtered;
  }, [searchParams, filters]);

  const resetFilter = () => {
    let params = new URLSearchParams(searchParams);
    const old = Object.fromEntries(searchParams.entries());
    const keys = Object.keys(old);
    filters.forEach((item) => {
      if (keys.includes(item.name)) {
        params.delete(item.name);
      }
    });

    replace(`${pathname}?${params}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='ml-auto'
        >
          <Sort className='w-4 h-4 mr-1 font-inter' />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='font-inter'
      >
        <>
          {filters?.map((item, index) => (
            <div key={index}>
              <DropdownMenuLabel className='capitalize'>
                {item.name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {item?.options.map((option, index) => (
                <>
                  <DropdownMenuCheckboxItem
                    key={index}
                    className='capitalize'
                    checked={searchParams.get(item.name)?.includes(option)}
                    onCheckedChange={() => handleChange(item.name, option)}
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                </>
              ))}
            </div>
          ))}
        </>
        {activeFilters?.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={resetFilter}
              // onClick={() => handleChange('')}
              className='text-destructive-foreground'
            >
              <X className='w-4 h-4 mr-1' /> Clear Filters
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
