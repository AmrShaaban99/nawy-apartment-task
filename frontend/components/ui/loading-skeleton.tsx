import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-gray-200 rounded", className)} />
  );
}

export function ApartmentCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <LoadingSkeleton className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <LoadingSkeleton className="h-5 w-20" />
          <LoadingSkeleton className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <LoadingSkeleton className="h-6 w-16" />
          <LoadingSkeleton className="h-6 w-16" />
          <LoadingSkeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ApartmentDetailsSkeleton() {
  return (
    <div className="space-y-6">
      <LoadingSkeleton className="h-64 w-full" />
      <div className="space-y-4">
        <LoadingSkeleton className="h-8 w-3/4" />
        <LoadingSkeleton className="h-6 w-1/2" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}