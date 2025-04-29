'use client';

import Link from 'next/link';
import {Facebook, Instagram, Twitter, Youtube} from 'lucide-react';

export default function Footer() {
  const navigationLinks = [
    {href: '/', label: 'Home'},
    {href: '/products', label: 'Products'},
    {href: '/orders', label: 'Orders'},
  ];

  const socialLinks = [
    {href: 'https://facebook.com', icon: Facebook, label: 'Facebook'},
    {href: 'https://instagram.com', icon: Instagram, label: 'Instagram'},
    {href: 'https://twitter.com', icon: Twitter, label: 'Twitter'},
    {href: 'https://youtube.com', icon: Youtube, label: 'Youtube'},
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-xl font-bold">Navigation</h2>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-6 w-6"/>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold">Contact</h2>
            <p className="text-gray-300">
              Email: support@store.com<br/>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}