import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface DiaMensalSkeletonProps {
  hasEvents?: boolean;
  eventCount?: number;
}

const DiaMensalSkeleton = memo(({ hasEvents = false, eventCount = 1 }: DiaMensalSkeletonProps) => {
  return (
    <div className="h-24 p-1 space-y-1">
      {/* Número do dia */}
      <div className="flex justify-between items-start mb-1">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-8 rounded-full" />
      </div>

      {/* Eventos skeleton */}
      {hasEvents && (
        <div className="space-y-1">
          {Array.from({ length: eventCount }).map((_, index) => (
            <div key={index} className="flex items-center space-x-1">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 flex-1 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Indicador de mais eventos */}
      {eventCount > 2 && (
        <Skeleton className="h-2 w-12 rounded mx-auto" />
      )}
    </div>
  );
});

DiaMensalSkeleton.displayName = 'DiaMensalSkeleton';

export default DiaMensalSkeleton;