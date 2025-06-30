import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-stone-800 to-stone-700 text-white py-8 px-4 mt-16 shadow-inner">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 md:justify-start w-full md:w-auto">
        <span className="text-2xl font-bold tracking-tight">Nawy</span>
        <span className="hidden md:inline-block text-stone-300 text-sm font-light ml-2">Find your dream apartment</span>
      </div>

      {/* Copyright */}
      <div className="w-full md:w-auto text-center md:text-right text-xs text-stone-400 mt-6 md:mt-0">
        &copy; {new Date().getFullYear()} Nawy. All rights reserved.
      </div>
    </div>
    </footer>
  );
}
