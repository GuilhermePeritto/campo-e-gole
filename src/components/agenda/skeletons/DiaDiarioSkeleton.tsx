import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface DiaDiarioSkeletonProps {
  hasEvents?: boolean;
  eventCount?: number;
}

const DiaDiarioSkeleton = memo(({ hasEvents = false, eventCount = 1 }: DiaDiarioSkeletonProps) => {
  return (
    <div className="space-y-1">
      {Array.from({ length: eventCount }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4 py-2 border-b border-border/10">
          {/* Horário */}
          <div className="w-16 text-right pt-1">
            <Skeleton className="h-4 w-12 rounded" />
          </div>

          {/* Área do evento */}
          <div className="flex-1 min-h-[60px] relative">
            {hasEvents && Math.random() > 0.6 && (
              <div className="absolute inset-0 bg-muted/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 flex-1 max-w-32 rounded" />
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
                <Skeleton className="h-3 w-12 rounded" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
});

DiaDiarioSkeleton.displayName = 'DiaDiarioSkeleton';

export default DiaDiarioSkeleton;