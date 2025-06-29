'use client';

import Link from 'next/link';
import { Building } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/apartments" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ApartmentFinder</span>
          </Link>

          {/* Simple Navigation */}
          <nav className="flex items-center">
            <Link 
              href="/apartments"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Browse Apartments
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}