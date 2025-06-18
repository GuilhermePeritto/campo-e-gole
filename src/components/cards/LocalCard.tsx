
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, MapPin, Users, Clock, DollarSign } from 'lucide-react';

interface LocalCardProps {
  local: {
    id: number;
    name: string;
    type: string;
    capacity: number;
    hourlyRate: number;
    status: string;
    characteristics: string[];
  };
  onEdit: (id: number) => void;
}

const LocalCard = ({ local, onEdit }: LocalCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <CardTitle className="text-lg">{local.name}</CardTitle>
              <CardDescription className="text-sm">{local.type}</CardDescription>
            </div>
          </div>
          <Badge variant={local.status === 'ativo' ? 'default' : 'destructive'}>
            {local.status === 'ativo' ? 'Ativo' : 'Manutenção'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{local.capacity} pessoas</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>R$ {local.hourlyRate.toFixed(2)}/hora</span>
          </div>
        </div>
        
        {local.characteristics && local.characteristics.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Características:</p>
            <div className="flex flex-wrap gap-1">
              {local.characteristics.slice(0, 3).map((char, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {char}
                </Badge>
              ))}
              {local.characteristics.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{local.characteristics.length - 3} mais
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(local.id)}
            className="w-full"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalCard;
