'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import Link from 'next/link';

import { debounce } from '@/lib/debouncer';
import { cn } from '@/lib/utils';

export const Navbar = ({ initialLocation }: { initialLocation: string }) => {
  const prevScrollLocation = useRef(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);

  const handleScroll = () => {
    const currLoc = window.scrollY;
    if (Math.abs(prevScrollLocation.current - currLoc) > 60 || currLoc < 10) {
      setShowNavbar(prevScrollLocation.current > currLoc || currLoc < 10);
      prevScrollLocation.current = currLoc;
    }
  };

  const debouncedScroll = useMemo(() => {
    return debounce(handleScroll, 15);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', debouncedScroll);
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [debouncedScroll]);

  const NavLink = ({ href, className, title }: any) => {
    return (
      <Link
        href={href}
        className={cn(
          'text-base font-semibold text-gray-500 hover:text-[#18181b]',
          href === currentLocation && 'text-[#18181b]',
          className,
        )}
        onClick={() => setCurrentLocation(href)}
      >
        {title}
      </Link>
    );
  };

  return (
    <div
      className="fixed flex items-center p-3 border-b px-4
    transition-all duration-400 ease-in-out z-50 w-full gap-x-4 shadow-md
    bg-white dark:bg-gray-900 dark:border-gray-800
    "
      style={{ top: showNavbar ? '-1px' : '-120px' }}
    >
      <NavLink href="/" title="Home" />
      <NavLink href="/projects" title="Projects" />
      <NavLink href="/about" title="About" />
      <NavLink href="/contact" title="Contact" />
    </div>
  );
};

export default Navbar;
