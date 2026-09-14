"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { NotificationBell } from "./NotificationBell";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/markets", label: "Markets" },
    { href: "/trade/BTCUSDT", label: "Trade" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/alerts", label: "Alerts" },
    { href: "/fees", label: "Fees" },
    { href: "/wallet", label: "Wallet" },
    { href: "/settings", label: "Settings" },
    { href: "/notifications", label: "Notifications" },
    { href: "/trading-rules", label: "Trading Rules" },
  ];

  const accountLinks = [
    { href: "/profile", label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:justify-start">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 md:mr-6 lg:mr-8">
            <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-zinc-950 font-bold text-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] hover-scale">
              ▲
            </Link>
            <Link href="/" className="text-xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              ApexTrader
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-xs lg:text-sm font-medium text-zinc-400 transition-colors hover:text-white whitespace-nowrap">
                    {link.label}
                </Link>
            ))}
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4 md:ml-auto md:pl-6 md:border-l md:border-zinc-800">
            {user ? (
                <>
                    <NotificationBell />
                    <div className="relative">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                            Account
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl py-1 z-50 animate-slideDown">
                                {accountLinks.map(link => (
                                    <Link key={link.href} href={link.href} className="block px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                        {link.label}
                                    </Link>
                                ))}
                                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-zinc-800 hover:text-rose-400">Logout</button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <Link href="/signin" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Sign In</Link>
                    <Link href="/signup" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">Sign Up</Link>
                </>
            )}
            <Link href="/trade/BTCUSDT" className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-all hover-scale">
              Launch Platform
            </Link>
          </div>
          

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-900 animate-mobileMenu" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white">
                    {link.label}
                </Link>
            ))}
            
            {user ? (
                <div className="border-t border-zinc-900 my-2 pt-2">
                    <p className="px-3 py-2 text-base font-semibold text-white">Account</p>
                    {accountLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-zinc-300 hover:bg-zinc-900 hover:text-white">
                            {link.label}
                        </Link>
                    ))}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-rose-500 hover:bg-zinc-900">Logout</button>
                </div>
            ) : (
                <div className="border-t border-zinc-900 my-2 pt-2 flex flex-col gap-2 px-3">
                    <Link href="/signin" onClick={() => setIsOpen(false)} className="w-full text-left py-2 text-base font-medium text-zinc-300 hover:text-white">Sign In</Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)} className="w-full text-left py-2 text-base font-medium text-zinc-300 hover:text-white">Sign Up</Link>
                </div>
            )}
            <div className="px-3 pt-2">
              <Link href="/trade/BTCUSDT" onClick={() => setIsOpen(false)} className="w-full rounded-lg bg-emerald-500 py-2.5 text-center text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-colors">Launch Platform</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
