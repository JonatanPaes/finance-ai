'use client'

import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

export function Navbar() {
  const pathName = usePathname()

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/transactions', label: 'Transações' },
    { href: '/subscription', label: 'Assinatura' },
  ]

  return (
    <nav className="flex justify-between border-b border-solid px-4 py-4 md:px-8">
      <div className="flex items-center gap-4 md:gap-10">
        <Image
          src="/logo.svg"
          width={175}
          height={40}
          alt="Finance AI"
          className="w-32 md:w-44"
        />

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathName === link.href
                  ? 'font-bold text-primary'
                  : 'text-muted-foreground transition-colors hover:text-primary'
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <UserButton showName />
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[300px] flex-col sm:w-[400px]"
          >
            <div className="mt-8 flex flex-grow flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    pathName === link.href
                      ? 'text-lg font-bold text-primary'
                      : 'text-lg text-muted-foreground transition-colors hover:text-primary'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <UserButton showName />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
