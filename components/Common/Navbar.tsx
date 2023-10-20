'use client';

import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandX,
  IconMail,
} from '@tabler/icons-react';
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
    <header
      className="fixed flex items-center p-3 border-b px-4
    transition-all duration-400 ease-in-out z-50 w-full shadow-md
    bg-white dark:bg-gray-900 dark:border-gray-800
    "
      style={{ top: showNavbar ? '-1px' : '-120px' }}
    >
      <div className="flex flex-row w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 mx-auto">
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-4">
          <NavLink href="/" title="Home" />
          <NavLink href="/projects" title="Projects" />
          <NavLink href="/about" title="About" />
        </div>
        <div className="flex-grow" />
        <div className="flex flex-row items-center gap-x-2 sm:gap-x-4">
          {process.env.NEXT_PUBLIC_EMAIL && (
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconMail size={24} />
            </a>
          )}
          {process.env.NEXT_PUBLIC_GITHUB_PROFILE && (
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={24} />
            </a>
          )}
          {process.env.NEXT_PUBLIC_LINKEDIN_PROFILE && (
            <a
              href={process.env.NEXT_PUBLIC_LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin size={24} />
            </a>
          )}
          {process.env.NEXT_PUBLIC_THREADS_PROFILE && (
            <a
              href={process.env.NEXT_PUBLIC_THREADS_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandThreads size={24} />
            </a>
          )}
          {process.env.NEXT_PUBLIC_X_PROFILE && (
            <a
              href={process.env.NEXT_PUBLIC_X_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandX size={24} />
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
