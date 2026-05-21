'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CmsMasterNav, CmsMegaSection } from '@/lib/cms';

type Column = {
  index: number;
  heading: string;
  items: { label: string; href: string }[];
};

type Props = {
  nav: CmsMasterNav | null;
};

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Menu = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function NavLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function buildColumns(nav: CmsMasterNav): Column[] {
  const columns: Column[] = [];
  nav.sectionKeys.forEach((key, idx) => {
    if (!key) return;
    const section: CmsMegaSection | undefined = nav.sections[key];
    if (!section) return;
    const items = section.items
      .filter((item) => item.label || item.href)
      .map((item) => ({
        label: item.label ?? item.href ?? '',
        href: item.href ?? '#',
      }));
    columns.push({
      index: idx,
      heading: section.heading ?? `Section ${idx + 1}`,
      items,
    });
  });
  return columns;
}

function BrandMark() {
  return (
    <Link href="/" className="flex flex-col cursor-pointer">
      <h1 className="text-xl md:text-2xl font-bold text-[#002D72] tracking-widest uppercase leading-tight font-serif whitespace-nowrap">
        Omni Hotels And Resorts
      </h1>
    </Link>
  );
}

function ReserveCta({ mobile = false }: { mobile?: boolean }) {
  const base =
    'bg-[#002D72] text-white font-bold uppercase tracking-widest hover:bg-[#001D4A] transition-all';
  return mobile ? (
    <button type="button" className={`${base} w-full py-5 shadow-xl`}>
      Reserve Now
    </button>
  ) : (
    <button
      type="button"
      className={`${base} hidden md:block px-8 py-3 text-xs transform hover:scale-105`}
    >
      Book a Room
    </button>
  );
}

export default function CmsSiteNav({ nav }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const columns = nav ? buildColumns(nav) : [];

  return (
    <header className="sticky top-0 w-full z-50 bg-white shadow-lg border-b-2 border-[#8A7244]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <BrandMark />

          <nav className="hidden xl:flex space-x-4 h-full">
            {columns.map((column) => (
              <div
                key={column.index}
                className="relative flex items-center group h-full"
                onMouseEnter={() => setActiveDropdown(column.index)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="text-gray-700 hover:text-[#8A7244] px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center"
                >
                  {column.heading}
                  {column.items.length > 0 && (
                    <ChevronDown
                      className={`ml-1 w-3 h-3 text-gray-400 transition-transform ${
                        activeDropdown === column.index ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {column.items.length > 0 && (
                  <div
                    className={`absolute top-full left-0 w-80 bg-white border border-gray-100 shadow-2xl py-2 transition-all duration-200 transform ${
                      activeDropdown === column.index
                        ? 'opacity-100 translate-y-0 visible'
                        : 'opacity-0 -translate-y-2 invisible'
                    }`}
                  >
                    {column.items.map((item, idx) => (
                      <NavLink
                        key={`${column.index}-${idx}`}
                        href={item.href}
                        className="flex items-center justify-between px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0"
                      >
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <ReserveCta />
            {columns.length > 0 && (
              <button
                type="button"
                className="xl:hidden text-[#002D72]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-24 bg-white z-40 overflow-y-auto">
          <div className="p-6 space-y-8">
            {columns.map((column) => (
              <div key={column.index} className="border-b border-gray-100 pb-4">
                <h3 className="text-[10px] font-bold text-[#8A7244] uppercase tracking-[0.2em] mb-4">
                  {column.heading}
                </h3>
                <ul className="space-y-4 ml-2">
                  {column.items.map((item, idx) => (
                    <li key={idx}>
                      <NavLink
                        href={item.href}
                        className="flex items-center justify-between group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="text-xl text-[#002D72] font-serif">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="pt-4">
              <ReserveCta mobile />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
