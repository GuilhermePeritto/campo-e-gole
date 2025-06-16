
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CampoHorarioProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  id?: string;
}

const CampoHorario: React.FC<CampoHorarioProps> = ({
  label,
  value = '',
  onChange,
  className,
  required = false,
  id
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="time"
        value={value}
        onChange={handleChange}
        className={cn("h-11", className)}
        required={required}
      />
    </div>
  );
};

export default CampoHorario;
