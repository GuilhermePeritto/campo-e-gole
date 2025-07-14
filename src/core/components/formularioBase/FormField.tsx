import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  description?: string;
  colSpan?: 1 | 2 | 3 | 'full';
  variant?: 'default' | 'compact';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
  className = "",
  labelClassName = "",
  description,
  colSpan = 1,
  variant = "default"
}) => {
  const getColSpanClass = () => {
    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-1 lg:col-span-2',
      3: 'col-span-1 lg:col-span-2 xl:col-span-3',
      'full': 'col-span-full'
    };
    return colSpanClasses[colSpan];
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'space-y-2';
      default:
        return 'space-y-3';
    }
  };

  return (
    <div className={cn(getVariantClasses(), getColSpanClass(), className)}>
      <div className="flex items-center justify-between">
        <Label className={cn(
          "text-sm font-semibold text-foreground/90",
          labelClassName
        )}>
          {label}
          {required && (
            <span className="text-destructive ml-1 font-bold">*</span>
          )}
        </Label>
      </div>
      
      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      
      <div className="space-y-1">
        {children}
        {error && (
          <div className="flex items-center gap-2 text-xs text-destructive">
            <div className="w-1 h-1 bg-destructive rounded-full"></div>
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField; 