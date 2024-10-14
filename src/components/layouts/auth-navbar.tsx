import Link from 'next/link';
import Logo from '../common/logo';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function AuthNavbar() {
  return (
    <header className='py-5 w-full shadow-nav'>
      <div className='container flex items-center justify-between'>
        <Logo />

        {/* <Link
          href={'/'}
          className='hidden lg:flex gap-x-2 hover:text-primary'
        >
          <IoIosArrowRoundBack className='w-6 h-6' />
          Back to Website
        </Link> */}
      </div>
    </header>
  );
}
