'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
}

export default function MobileMenu({ locale, navLinks }: { locale: string; navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-1 p-2 relative z-50"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className={`block w-5 h-px bg-[#1F1F1F] transition-all ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
        <span className={`block w-5 h-px bg-[#1F1F1F] transition-all ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-px bg-[#1F1F1F] transition-all ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
      </button>

      <div className={`fixed inset-0 z-40 bg-[#F5F2ED] md:hidden transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-lg tracking-[3px] uppercase">
          <Link href={`/${locale}`} className="text-[#1F1F1F] hover:text-[#8C3B2E] transition-colors">Home</Link>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={`/${locale}${href}`} className="text-[#1F1F1F] hover:text-[#8C3B2E] transition-colors">
              {label}
            </Link>
          ))}
          <Link href={`/${locale}/booking`} className="mt-4 inline-flex items-center gap-2 bg-[#8C3B2E] text-white px-8 py-4 text-xs font-medium tracking-[2px] uppercase hover:bg-[#1F1F1F] transition-all">
            Book Now →
          </Link>
        </div>
      </div>
    </>
  );
}
