import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = (currency = 'NGN', fractiondigit = 2) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: fractiondigit,
  });

//Function that returns the first or first two letters from a name
export const findUpper = (text: string) => {
  let extractedString = [];

  for (var i = 0; i < text?.length; i++) {
    if (
      text.charAt(i) === text.charAt(i).toUpperCase() &&
      text.charAt(i) !== ' '
    ) {
      extractedString.push(text.charAt(i));
    }
  }
  if (extractedString.length > 1) {
    return extractedString[0] + extractedString[1];
  } else {
    return extractedString[0];
  }
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function generateSlug(str: string) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Trim whitespace from both ends
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters (except hyphens)
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Remove leading hyphen
    .replace(/-+$/, ''); // Remove trailing hyphen
}

export const formatDate = (str: string) => {
  return new Date(str).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

export const formatDateNumeric = (str: string | Date) => {
  return new Date(str).toLocaleDateString('en-ca', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTimeNumeric = (str: string) => {
  return new Date(str).toLocaleDateString('en-ca', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDateWithTime = (str: string) => {
  return new Date(str).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    // hour12: false,
  });
};

//shortens a long sentence
export const truncateText = (value: string, limit: number, length = 20) => {
  return value?.length > length ? value.substring(0, limit) + '...' : value;
};

//converts objects to query string
export const objectToQueryString = (obj: any) =>
  Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

//Removes special character from the beginning or end of the string
export function removeSpecialCharacters(str: string) {
  // Define a regular expression to match special characters at the beginning or end of the string
  const regex = /^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g;

  // Use the replace method with the regular expression to remove the special characters
  const cleanedStr = str.replace(regex, '');

  return cleanedStr;
}
