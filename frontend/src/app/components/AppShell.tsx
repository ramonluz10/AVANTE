"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { href: '/', label: 'Início' },
  { href: '/dashboard', label: 'Painel' },
  { href: '/avi', label: 'Avi' },
  { href: '/profile', label: 'Perfil' }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${pathname}"]`);
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    } else {
      setIndicator((current) => ({ ...current, opacity: 0 }));
    }
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--line)',
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.3s var(--ease), box-shadow 0.3s var(--ease)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none'
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: -1,
            height: 2,
            background: 'linear-gradient(90deg, transparent, var(--blue-light), var(--blue), var(--yellow), transparent)',
            backgroundSize: '200% 100%',
            animation: 'glowSweep 6s ease-in-out infinite',
            opacity: 0.55
          }}
        />
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, paddingBottom: 14, gap: 20 }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 11, fontWeight: 800, fontSize: 19, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
            <Image
              src="/avante-logomark.png"
              alt=""
              width={48}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
            Avante
          </Link>

          <nav
            ref={navRef}
            style={{
              position: 'relative',
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              background: 'var(--mist)',
              border: '1px solid var(--line)',
              borderRadius: 999,
              padding: 4
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 4,
                bottom: 4,
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
                background: 'var(--white)',
                border: '1px solid var(--blue-100)',
                borderRadius: 999,
                boxShadow: '0 0 0 1px var(--blue-100), 0 0 14px rgba(0,91,255,0.22)',
                transition: 'left 0.35s var(--ease), width 0.35s var(--ease), opacity 0.25s ease'
              }}
            />
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    color: active ? 'var(--blue-dark)' : 'var(--slate)',
                    fontWeight: 600,
                    fontSize: 13.5,
                    padding: '8px 14px',
                    borderRadius: 999,
                    transition: 'color 0.25s ease'
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/auth" className="btn btn-primary" style={{ padding: '10px 18px' }}>
            Entrar
          </Link>
        </div>
      </header>
      {children}
      <footer style={{ borderTop: '1px solid var(--line)', marginTop: 80, padding: '28px 0' }}>
        <div
          className="container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--slate)'
          }}
        >
          <span>© {new Date().getFullYear()} Avante</span>
          <span>um passo de cada vez</span>
        </div>
      </footer>
    </>
  );
}
