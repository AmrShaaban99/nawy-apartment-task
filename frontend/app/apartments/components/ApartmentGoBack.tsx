"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation';
const ApartmentGoBack = () => {
    const router = useRouter();
  return (
    <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />Back to listings
        </Button>
    </div>
  )
}

export default ApartmentGoBack