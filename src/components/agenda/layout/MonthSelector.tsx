import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface MonthSelectorProps {
  selectedMonth: number;
  year: number;
  onMonthSelect: (month: number) => void;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  curveSide?: 'left' | 'right';
}

const monthNames = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
];

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedMonth,
  year,
  onMonthSelect,
  className,
  orientation = 'vertical',
  curveSide = 'right',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isVertical = orientation === 'vertical';
  const [currentMonth, setCurrentMonth] = useState(selectedMonth);

  // Exibe 5 meses empilhados, centrando no selecionado
  const getVisibleMonths = () => {
    const centerIndex = currentMonth;
    const start = Math.max(0, centerIndex - 2);
    const end = Math.min(monthNames.length, start + 5);
    const adjustedStart = Math.max(0, end - 5);
    return monthNames.slice(adjustedStart, end).map((name, idx) => ({
      name,
      index: adjustedStart + idx
    }));
  };

  const visibleMonths = getVisibleMonths();

  // Scroll para navegar pelos meses
  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    const newMonth = Math.max(0, Math.min(monthNames.length - 1, currentMonth + direction));
    if (newMonth !== currentMonth) {
      setCurrentMonth(newMonth);
      onMonthSelect(newMonth);
    }
  };

  return (
    <div
      className={cn(
        "relative select-none flex flex-col items-center justify-center",
        isVertical ? "w-20 h-full max-h-[400px]" : "w-full max-w-[280px]",
        "pr-4 pl-8 py-4", // curva sempre à direita
        className
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onWheel={handleScroll}
    >
      <span className="text-xs font-medium mb-2 text-[hsl(var(--day-selector-text-light))]">{year}</span>
      <div className={cn(
        "relative flex items-center justify-center",
        isVertical ? "h-80 flex-col" : "h-20"
      )}>
        {visibleMonths.map((month, index) => {
          const isSelected = month.index === currentMonth;
          // Animação/empilhamento igual ao DaySelector
          const getTransformStyle = () => {
            if (!isExpanded) {
              return {
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
            if (isVertical) {
              const angle = (index - 2) * 25;
              const radius = 30;
              // curva sempre para a direita
              let x = 1 * Math.abs(Math.sin((angle * Math.PI) / 180) * radius);
              const y = Math.cos((angle * Math.PI) / 180) * radius;
              if (isSelected) {
                x += 8;
              }
              return {
                transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            } else {
              const angle = (index - 2) * 25;
              const radius = 50;
              const x = Math.sin((angle * Math.PI) / 180) * radius;
              const yMultiplier = 1;
              const y = yMultiplier * Math.abs(Math.cos((angle * Math.PI) / 180) * radius) - (yMultiplier * 20);
              return {
                transform: `translate(${x}px, ${y}px) scale(${isSelected ? 1.1 : 1})`,
                zIndex: isSelected ? 20 : 10 - Math.abs(index - 2)
              };
            }
          };

          const borderRadius = isVertical
            ? 'rounded-r-xl'
            : 'rounded-b-xl';

          return (
            <button
              key={month.index}
              className={cn(
                "absolute cursor-pointer transition-all duration-500 ease-out border-2 flex flex-col items-center justify-center transform-gpu will-change-transform w-16 h-12 font-bold text-base",
                borderRadius,
                isSelected
                  ? "bg-[linear-gradient(135deg,_hsl(var(--day-selector-selected)),_hsl(var(--day-selector-selected-glow)))] border-[hsl(var(--day-selector-selected))] text-[hsl(var(--day-selector-card))] shadow-[var(--shadow-day-selected)] z-20 scale-110"
                  : "bg-[hsl(var(--day-selector-card))] border-[hsl(var(--day-selector-card))] text-[hsl(var(--day-selector-text))] shadow-[var(--shadow-day-card)] opacity-60 z-10 hover:bg-[hsl(var(--day-selector-card-hover))] hover:shadow-[var(--shadow-day-hover)]"
              )}
              style={{
                ...(isVertical
                  ? { top: `${index * 14}px` }
                  : { left: `${index * 12}px` }
                ),
                ...getTransformStyle()
              }}
              onClick={() => {
                setCurrentMonth(month.index);
                onMonthSelect(month.index);
              }}
            >
              {month.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MonthSelector; 