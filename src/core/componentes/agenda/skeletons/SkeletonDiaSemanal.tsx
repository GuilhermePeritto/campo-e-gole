import { Skeleton } from '@/components/ui/skeleton';
import { memo } from 'react';

interface SkeletonDiaSemanalProps {
  hasEvents?: boolean;
  eventCount?: number;
}

const SkeletonDiaSemanal = memo(({ 
  hasEvents = true, 
  eventCount = 3 
}: SkeletonDiaSemanalProps) => {
  return (
    <div className="h-full min-h-96 p-2 space-y-2">
      {/* Cabeçalho do dia */}
      <div className="text-center space-y-1 pb-2 border-b border-border/20">
        <Skeleton className="h-4 w-16 mx-auto rounded" />
        <Skeleton className="h-6 w-8 mx-auto rounded" />
      </div>

      {/* Slots de horário com eventos */}
      <div className="space-y-2 flex-1">
        {hasEvents && Array.from({ length: eventCount }).map((_, index) => (
          <div key={index} className="space-y-1">
            {/* Horário */}
            <Skeleton className="h-3 w-12 rounded" />
            
            {/* Evento */}
            <div className="bg-muted/30 rounded-lg p-2 space-y-1">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-4 flex-1 rounded" />
              </div>
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        ))}

        {/* Slots vazios */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`empty-${index}`} className="py-6 border-b border-border/10">
            <Skeleton className="h-3 w-12 rounded opacity-30" />
          </div>
        ))}
      </div>
    </div>
  );
});

SkeletonDiaSemanal.displayName = 'SkeletonDiaSemanal';

export default SkeletonDiaSemanal;