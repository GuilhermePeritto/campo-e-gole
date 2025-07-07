import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Plus } from 'lucide-react';
import { memo, ReactNode } from 'react';

interface DropZoneProps {
  id: string;
  data: {
    date: string;
    time?: string;
    type: 'day' | 'timeSlot';
  };
  children?: ReactNode;
  isActive?: boolean;
  className?: string;
  acceptsHover?: boolean;
}

const DropZone = memo(({
  id,
  data,
  children,
  isActive = false,
  className,
  acceptsHover = true
}: DropZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data
  });

  const isHighlighted = isActive || (isOver && acceptsHover);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative transition-all duration-200 rounded-lg",
        isHighlighted && [
          "bg-gradient-to-br from-primary/10 to-primary/5",
          "border-2 border-dashed border-primary/40",
          "shadow-lg shadow-primary/20"
        ],
        !isHighlighted && acceptsHover && [
          "hover:bg-accent/30 hover:border-border/60"
        ],
        className
      )}
    >
      {children}
      
      {/* Overlay de drop ativo */}
      {isHighlighted && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/5 rounded-lg pointer-events-none">
          <div className="flex items-center space-x-2 text-primary font-medium">
            {data.type === 'timeSlot' ? (
              <>
                <Clock className="h-4 w-4" />
                <span className="text-sm">Soltar aqui</span>
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Mover para este dia</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Indicador de drop zone vazia */}
      {!children && acceptsHover && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Plus className="h-3 w-3" />
            <span className="text-xs">Adicionar evento</span>
          </div>
        </div>
      )}
    </div>
  );
});

DropZone.displayName = 'DropZone';

export default DropZone;