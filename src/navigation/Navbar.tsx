'use client';

import Link from 'next/link';
import Image from 'next/image';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import CartButton from "@/components/CartButton";
import CartModal from "@/components/CartModal";
import {AuthButton} from "@/components/AuthButton";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Navbar() {
  const pathname = usePathname();
  const { data } = useSession()

  const navigationLinks = [
    {href: '/', label: 'Home'},
    {href: '/products', label: 'Products'},
  ];

  const adminLinks = [
    {href: '/', label: 'Home'},
    {href: '/products', label: 'Products'},
    {href: '/orders', label: 'Orders'},
  ]

  const [links, setLinks] = useState(navigationLinks)

  useEffect(() => {
    if (data?.user) {
      setLinks(adminLinks)
      return
    }
    setLinks(navigationLinks)
  }, [data])

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild className="md:hidden">
                <button className="text-2xl font-bold text-blue-600">
                  <Image src="/logo.png" alt="Logo" width={60} height={60}/>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="md:hidden min-w-[200px] bg-white rounded-md shadow-lg p-2">
                  {links.map((link) => (
                    <DropdownMenu.Item key={link.href} className="outline-none">
                      <Link
                        href={link.href}
                        className={clsx(
                          'block px-4 py-2 text-sm rounded-md',
                          pathname === link.href
                            ? 'bg-blue-100 text-blue-600'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                        )}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
            <Link href="/" className="hidden md:block text-2xl font-bold text-blue-600">
            <Image src="/logo.png" alt="Logo" width={60} height={60}/>
            </Link>
            <div className="hidden md:flex md:space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <AuthButton />
            <CartButton />
          </div>

        </div>
      </div>
      <CartModal />
    </nav>
  );
}