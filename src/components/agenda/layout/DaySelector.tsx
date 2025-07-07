import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

interface DayInfo {
  day: number;
  weekDay: string;
  isToday: boolean;
}

interface DaySelectorProps {
  onDaySelect?: (day: number) => void;
  selectedDay?: number;
  month?: number;
  year?: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  curveSide?: 'left' | 'right';
}

const DaySelector: React.FC<DaySelectorProps> = ({
  onDaySelect,
  selectedDay,
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  className,
  orientation = 'vertical',
  curveSide = 'right'
}) => {
  const [currentDay, setCurrentDay] = useState(selectedDay || new Date().getDate());
  const [isExpanded, setIsExpanded] = useState(false);
  const [days, setDays] = useState<DayInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gerar dias do mês
  useEffect(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const generatedDays: DayInfo[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const weekDayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      generatedDays.push({
        day: i,
        weekDay: weekDayNames[date.getDay()],
        isToday: isCurrentMonth && i === today.getDate()
      });
    }
    setDays(generatedDays);
  }, [month, year]);

  // Atualizar currentDay se selectedDay mudar
  useEffect(() => {
    if (selectedDay && selectedDay !== currentDay) setCurrentDay(selectedDay);
  }, [selectedDay]);

  // Obter os 5 dias visíveis centrados no dia atual
  const getVisibleDays = () => {
    const centerIndex = days.findIndex(d => d.day === currentDay);
    const start = Math.max(0, centerIndex - 2);
    const end = Math.min(days.length, start + 5);
    const adjustedStart = Math.max(0, end - 5);
    return days.slice(adjustedStart, end);
  };

  const handleDayClick = (day: number) => {
    setCurrentDay(day);
    onDaySelect?.(day);
  };

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    const newDay = Math.max(1, Math.min(days.length, currentDay + direction));
    if (newDay !== currentDay) {
      handleDayClick(newDay);
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDay = direction === 'prev' 
      ? Math.max(1, currentDay - 1)
      : Math.min(days.length, currentDay + 1);
    if (newDay !== currentDay) {
      handleDayClick(newDay);
    }
  };

  const visibleDays = getVisibleDays();
  const isVertical = orientation === 'vertical';

  return (
    <div 
      className={cn(
        "relative select-none",
        isVertical ? "w-20 h-full max-h-[400px]" : "w-full max-w-[280px]",
        isVertical 
          ? curveSide === 'left' ? "pr-8 pl-4 py-4" : "pl-8 pr-4 py-4"
          : curveSide === 'left' ? "pt-8 pb-4 px-4" : "pb-8 pt-4 px-4",
        className
      )}
      ref={containerRef}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onWheel={handleScroll}
    >
      {/* Header com navegação */}
      <div className={cn(
        "flex items-center mb-4",
        isVertical ? "flex-col space-y-2" : "justify-between"
      )}>
      </div>
      {/* Container dos cards */}
      <div className={cn(
        "relative flex items-center justify-center",
        isVertical ? "h-80 flex-col" : "h-20"
      )}>
        {visibleDays.map((dayInfo, index) => {
          const isSelected = dayInfo.day === currentDay;
          // Calcular posição no semicírculo quando expandido
          const getTransformStyle = () => {
            if (!isExpanded) {
              return {
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
            if (isVertical) {
              const angle = (index - 2) * 25;
              const radius = 30;
              const xMultiplier = curveSide === 'left' ? -1 : 1;
              const x = xMultiplier * Math.abs(Math.sin((angle * Math.PI) / 180) * radius);
              return {
                transform: `translate(${x}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            } else {
              const angle = (index - 2) * 25;
              const radius = 40;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const yMultiplier = curveSide === 'left' ? -1 : 1;
              const y = yMultiplier * Math.abs(Math.cos((angle * Math.PI) / 180) * radius) - (yMultiplier * 20);
              return {
                transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
          };

          // Curvatura dinâmica
          const borderRadius = isVertical
            ? (curveSide === 'right' ? 'rounded-r-xl' : 'rounded-xl')
            : (curveSide === 'right' ? 'rounded-b-xl' : 'rounded-t-xl');

          return (
            <div
              key={dayInfo.day}
              className={cn(
                "absolute cursor-pointer transition-all duration-500 ease-out",
                "border-2 flex flex-col items-center justify-center",
                "transform-gpu will-change-transform",
                isVertical ? "w-14 h-12" : "w-12 h-16",
                borderRadius,
                {
                  // Card selecionado
                  "bg-[linear-gradient(135deg,_hsl(var(--day-selector-selected)),_hsl(var(--day-selector-selected-glow)))] border-[hsl(var(--day-selector-selected))] text-[hsl(var(--day-selector-card))] shadow-[var(--shadow-day-selected)] z-20 scale-110": isSelected,
                  // Card normal
                  "bg-[hsl(var(--day-selector-card))] border-[hsl(var(--day-selector-card))] text-[hsl(var(--day-selector-text))] shadow-[var(--shadow-day-card)] opacity-60 z-10 hover:bg-[hsl(var(--day-selector-card-hover))] hover:shadow-[var(--shadow-day-hover)]": !isSelected,
                  // Card de hoje
                  "ring-2 ring-[hsl(var(--day-selector-primary))]/30": dayInfo.isToday && !isSelected,
                }
              )}
              style={{
                ...(isVertical 
                  ? { top: `${index * 14}px` }
                  : { left: `${index * 12}px` }
                ),
                ...getTransformStyle()
              }}
              onClick={() => handleDayClick(dayInfo.day)}
            >
              <span className={cn(
                "font-medium opacity-70",
                isVertical ? "text-xs" : "text-xs",
                isSelected ? "text-[hsl(var(--day-selector-card))]" : "text-[hsl(var(--day-selector-text-light))]"
              )}>
                {isVertical ? dayInfo.weekDay.slice(0, 3) : dayInfo.weekDay}
              </span>
              <span className={cn(
                "font-bold leading-none",
                isVertical ? "text-xl" : "text-lg",
                isSelected ? "text-[hsl(var(--day-selector-card))]" : "text-[hsl(var(--day-selector-text))]"
              )}>
                {dayInfo.day}
              </span>
              {dayInfo.isToday && (
                <div className={cn(
                  "absolute w-1.5 h-1.5 rounded-full",
                  isVertical ? (curveSide === 'left' ? "-left-2" : "-right-2") : "-bottom-2",
                  isSelected ? "bg-[hsl(var(--day-selector-card))]" : "bg-[hsl(var(--day-selector-primary))]"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector; 