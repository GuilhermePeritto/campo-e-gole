
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface EventoArrastavelProps {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  clientName: string;
  venue: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  onClick: () => void;
  isDragging?: boolean;
  className?: string;
}

const EventoArrastavel: React.FC<EventoArrastavelProps> = ({
  id,
  title,
  startTime,
  endTime,
  color,
  clientName,
  venue,
  status,
  onClick,
  isDragging = false,
  className
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'border-green-500';
      case 'pending':
        return 'border-yellow-500';
      case 'cancelled':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      className={cn(
        "bg-card border-l-4 rounded-r-md p-2 cursor-pointer transition-all duration-200 hover:shadow-md group relative",
        getStatusColor(),
        isDragging && "opacity-50 scale-95",
        className
      )}
      style={{ borderLeftColor: color }}
      onClick={onClick}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', id.toString());
      }}
    >
      <div className="flex items-start justify-between space-x-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {title}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {startTime} - {endTime}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {venue}
          </p>
        </div>
        
        <Avatar className="h-6 w-6 flex-shrink-0">
          <AvatarFallback 
            className="text-xs font-medium"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            {getInitials(clientName)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Indicador de status */}
      <div className="absolute top-1 right-1">
        <div 
          className={cn(
            "w-2 h-2 rounded-full",
            status === 'confirmed' && "bg-green-500",
            status === 'pending' && "bg-yellow-500",
            status === 'cancelled' && "bg-red-500"
          )}
        />
      </div>
    </div>
  );
};

export default EventoArrastavel;
