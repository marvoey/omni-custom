'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/restaurant', label: 'Trick Rider' },
  { href: '/restaurant2', label: 'Editorial' },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="h-2 w-2 rounded-full bg-amber-500 group-hover:scale-125 transition-transform" />
          <span className="text-white text-sm font-bold uppercase tracking-[0.3em]">
            Omni <span className="text-amber-500">PGA Frisco</span>
          </span>
        </Link>

        <ul className="flex items-center gap-8">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-colors ${
                    active
                      ? 'text-amber-500'
                      : 'text-gray-300 hover:text-amber-500'
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/restaurant"
          className="hidden md:inline-block bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors"
        >
          Reserve
        </Link>
      </nav>
    </header>
  );
}
