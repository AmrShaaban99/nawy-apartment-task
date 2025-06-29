'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ApartmentMedia } from '@/types/apartment';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  media: ApartmentMedia[];
  title: string;
}

export function ImageGallery({ media, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Filter only images
  const images = media.filter(m => m.type === 'image');

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...Array.from(prev), index]));
  };

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-gray-400 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden group cursor-pointer">
          {!imageErrors.has(currentIndex) ? (
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `${title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onClick={() => openModal(currentIndex)}
              onError={() => handleImageError(currentIndex)}
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                <p>Image not available</p>
              </div>
            </div>
          )}
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm max-w-xs truncate">
              {images[currentIndex].caption}
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(0, 4).map((image, index) => (
              <div
                key={image.id || index}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                  currentIndex === index 
                    ? "border-blue-500 ring-2 ring-blue-200" 
                    : "border-transparent hover:border-gray-300"
                )}
                onClick={() => setCurrentIndex(index)}
              >
                {!imageErrors.has(index) ? (
                  <Image
                    src={image.url}
                    alt={image.caption || `${title} - Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded"></div>
                  </div>
                )}
                {images.length > 4 && index === 3 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                    +{images.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <div className="relative w-full h-full">
            {!imageErrors.has(currentIndex) ? (
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].caption || `${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                onError={() => handleImageError(currentIndex)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                  <p>Image not available</p>
                </div>
              </div>
            )}
            
            {/* Modal Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Modal Counter and Caption */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-center">
              <div>{currentIndex + 1} / {images.length}</div>
              {images[currentIndex].caption && (
                <div className="text-sm mt-1">{images[currentIndex].caption}</div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}