'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Mock-up', href: '/mock-up' },
  { label: 'Restaurant', href: '/restaurant' },
  { label: 'Room Carousel', href: '/room-carousel' },
  { label: 'Components', href: '/components' },
];

export default function DevSidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 right-4 z-40 flex flex-col items-end">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close dev tray' : 'Open dev tray'}
        aria-expanded={open}
        className="bg-neutral-900/90 text-white px-3 py-1 rounded-t-md border border-b-0 border-neutral-700 hover:bg-neutral-800 text-[10px] uppercase tracking-widest"
      >
        Dev {open ? '▼' : '▲'}
      </button>

      <aside
        className={`w-48 bg-neutral-900/95 text-white border border-b-0 border-neutral-700 backdrop-blur overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96' : 'max-h-0 border-0'
        }`}
      >
        <nav className="flex flex-col py-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-neutral-800 text-white border-l-2 border-white'
                    : 'text-neutral-300 hover:bg-neutral-800 hover:text-white border-l-2 border-transparent'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
