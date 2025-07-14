'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/stats', label: 'Stats' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full border-b border-gray-800 bg-black text-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold text-white">
          TypingDev
        </Link>
        <div className="flex space-x-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-gray-400',
                pathname === href && 'text-blue-400'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
