
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonDiaAgendaProps {
  isWeekView?: boolean;
}

const SkeletonDiaAgenda: React.FC<SkeletonDiaAgendaProps> = ({ 
  isWeekView = false 
}) => {
  if (isWeekView) {
    return (
      <div className="space-y-2 p-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="h-8 w-full rounded" 
            style={{ 
              height: `${Math.random() * 60 + 40}px`,
              marginTop: `${Math.random() * 20}px`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1 p-1">
      {Array.from({ length: 2 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full rounded" />
      ))}
    </div>
  );
};

export default SkeletonDiaAgenda;
