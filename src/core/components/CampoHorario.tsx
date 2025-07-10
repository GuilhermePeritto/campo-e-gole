
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CampoHorarioProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const CampoHorario = ({ 
  id, 
  label = "Horário", 
  value, 
  onChange, 
  required = false,
  className = ""
}: CampoHorarioProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="time"
        value={value}
        onChange={handleChange}
        required={required}
        className="h-11"
      />
    </div>
  );
};

export default CampoHorario;
