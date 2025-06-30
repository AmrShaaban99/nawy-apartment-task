'use client';
import { useState } from 'react';
import { useApartmentContext } from '@/contexts/ApartmentContext';
import { ApartmentSearchResponse } from '@/app/apartments/types/apartment';
import HeroSection from './components/HeroSection';
import ApartmentsSection from './components/ApartmentsSection';

export default function ApartmentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-rose-50 to-amber-50">
      {/* Hero Section with Modern Design */}
      <HeroSection/>
      {/* Main Content */}
      <ApartmentsSection />

    </div>
  );
}